import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { InputField } from '@/components/InputField';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, BorderRadius } from '@/constants/theme';
import { Worker } from '@/types';
import { saveLaborPayment, getWorkers, saveWorker, generateId, formatWeekRange } from '@/lib/storage';

interface AddPaymentScreenProps {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ params: { weekStart: string } }, 'params'>;
}

export default function AddPaymentScreen({ navigation, route }: AddPaymentScreenProps) {
  const { weekStart } = route.params;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [workerName, setWorkerName] = useState('');
  const [daysWorked, setDaysWorked] = useState('');
  const [regularHours, setRegularHours] = useState('');
  const [overtimeHours, setOvertimeHours] = useState('0');
  const [hourlyRate, setHourlyRate] = useState('');
  const [overtimeRate, setOvertimeRate] = useState('');
  const [notes, setNotes] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showWorkerInput, setShowWorkerInput] = useState(false);

  useEffect(() => {
    loadWorkers();
  }, []);

  useEffect(() => {
    if (hourlyRate) {
      setOvertimeRate((parseFloat(hourlyRate) * 1.5).toString());
    }
  }, [hourlyRate]);

  const loadWorkers = async () => {
    const data = await getWorkers();
    setWorkers(data);
  };

  const regularAmount = (parseFloat(regularHours) || 0) * (parseFloat(hourlyRate) || 0);
  const overtimeAmount = (parseFloat(overtimeHours) || 0) * (parseFloat(overtimeRate) || 0);
  const totalAmount = regularAmount + overtimeAmount;

  const handleSelectWorker = (worker: Worker) => {
    Haptics.selectionAsync();
    setSelectedWorker(worker);
    setWorkerName(worker.name);
    setHourlyRate(worker.hourlyRate.toString());
    setOvertimeRate((worker.hourlyRate * 1.5).toString());
    setShowWorkerInput(false);
  };

  const handleAddNewWorker = () => {
    setShowWorkerInput(true);
    setSelectedWorker(null);
    setWorkerName('');
    setHourlyRate('');
    setOvertimeRate('');
  };

  const handleSave = async () => {
    if (!workerName || !daysWorked || !regularHours || !hourlyRate) return;

    setSaving(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      let workerId = selectedWorker?.id;

      if (!selectedWorker) {
        const newWorker: Worker = {
          id: generateId(),
          name: workerName,
          hourlyRate: parseFloat(hourlyRate),
          createdAt: new Date().toISOString(),
        };
        await saveWorker(newWorker);
        workerId = newWorker.id;
      }

      await saveLaborPayment({
        id: generateId(),
        workerId: workerId!,
        workerName,
        daysWorked: parseFloat(daysWorked),
        regularHours: parseFloat(regularHours),
        overtimeHours: parseFloat(overtimeHours) || 0,
        hourlyRate: parseFloat(hourlyRate),
        overtimeRate: parseFloat(overtimeRate) || parseFloat(hourlyRate) * 1.5,
        totalAmount,
        weekStart,
        isPaid,
        notes,
        createdAt: new Date().toISOString(),
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error saving payment:', error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.weekBadge, { backgroundColor: theme.backgroundDefault }]}>
        <Feather name="calendar" size={16} color={theme.secondary} />
        <ThemedText type="small" style={{ color: theme.secondary, marginLeft: Spacing.sm }}>
          Week: {formatWeekRange(weekStart)}
        </ThemedText>
      </View>

      <ThemedText type="small" style={[styles.label, { color: theme.textSecondary }]}>
        Select Worker
      </ThemedText>

      <View style={styles.workerList}>
        {workers.map((worker) => (
          <Pressable
            key={worker.id}
            onPress={() => handleSelectWorker(worker)}
            style={[
              styles.workerItem,
              {
                backgroundColor: selectedWorker?.id === worker.id
                  ? `${theme.secondary}20`
                  : theme.backgroundSecondary,
                borderColor: selectedWorker?.id === worker.id
                  ? theme.secondary
                  : 'transparent',
              },
            ]}
            testID={`worker-${worker.id}`}
          >
            <View style={[styles.workerIcon, { backgroundColor: `${theme.categoryLabor}30` }]}>
              <Feather name="user" size={16} color={theme.categoryLabor} />
            </View>
            <ThemedText type="body" style={styles.workerName}>
              {worker.name}
            </ThemedText>
          </Pressable>
        ))}
        <Pressable
          onPress={handleAddNewWorker}
          style={[
            styles.workerItem,
            {
              backgroundColor: showWorkerInput ? `${theme.primary}20` : theme.backgroundSecondary,
              borderColor: showWorkerInput ? theme.primary : 'transparent',
            },
          ]}
          testID="add-new-worker"
        >
          <View style={[styles.workerIcon, { backgroundColor: `${theme.primary}30` }]}>
            <Feather name="plus" size={16} color={theme.primary} />
          </View>
          <ThemedText type="body" style={[styles.workerName, { color: theme.primary }]}>
            Add New
          </ThemedText>
        </Pressable>
      </View>

      {showWorkerInput ? (
        <InputField
          label="Worker Name"
          value={workerName}
          onChangeText={setWorkerName}
          placeholder="Enter worker name"
          testID="input-worker-name"
        />
      ) : null}

      <View style={styles.row}>
        <View style={styles.thirdField}>
          <InputField
            label="Days"
            value={daysWorked}
            onChangeText={setDaysWorked}
            placeholder="0"
            keyboardType="numeric"
            testID="input-days"
          />
        </View>
        <View style={styles.thirdField}>
          <InputField
            label="Regular Hrs"
            value={regularHours}
            onChangeText={setRegularHours}
            placeholder="0"
            keyboardType="numeric"
            testID="input-regular-hours"
          />
        </View>
        <View style={styles.thirdField}>
          <InputField
            label="OT Hrs"
            value={overtimeHours}
            onChangeText={setOvertimeHours}
            placeholder="0"
            keyboardType="numeric"
            testID="input-overtime-hours"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <InputField
            label="Hourly Rate"
            value={hourlyRate}
            onChangeText={setHourlyRate}
            placeholder="0"
            keyboardType="numeric"
            testID="input-rate"
          />
        </View>
        <View style={styles.halfField}>
          <InputField
            label="OT Rate (1.5x)"
            value={overtimeRate}
            onChangeText={setOvertimeRate}
            placeholder="0"
            keyboardType="numeric"
            testID="input-ot-rate"
          />
        </View>
      </View>

      <View style={[styles.totalCard, { backgroundColor: theme.backgroundDefault }]}>
        <View style={styles.breakdownRow}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>Regular:</ThemedText>
          <ThemedText type="body">{'\u09F3'}{regularAmount.toLocaleString()}</ThemedText>
        </View>
        <View style={styles.breakdownRow}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>Overtime:</ThemedText>
          <ThemedText type="body">{'\u09F3'}{overtimeAmount.toLocaleString()}</ThemedText>
        </View>
        <View style={[styles.breakdownRow, styles.totalRow]}>
          <ThemedText type="body" style={{ fontWeight: '600' }}>Total Amount</ThemedText>
          <ThemedText type="h2" style={{ color: theme.secondary }}>
            {'\u09F3'}{totalAmount.toLocaleString()}
          </ThemedText>
        </View>
      </View>

      <InputField
        label="Notes (Optional)"
        value={notes}
        onChangeText={setNotes}
        placeholder="Add any notes..."
        multiline
        style={{ height: 80, textAlignVertical: 'top', paddingTop: Spacing.md }}
        testID="input-notes"
      />

      <Pressable
        onPress={() => {
          Haptics.selectionAsync();
          setIsPaid(!isPaid);
        }}
        style={[styles.paidToggle, { backgroundColor: theme.backgroundDefault }]}
        testID="toggle-paid"
      >
        <ThemedText type="body">Mark as Paid</ThemedText>
        <View style={[
          styles.checkbox,
          {
            backgroundColor: isPaid ? theme.success : 'transparent',
            borderColor: isPaid ? theme.success : theme.border,
          },
        ]}>
          {isPaid ? <Feather name="check" size={16} color="#FFFFFF" /> : null}
        </View>
      </Pressable>

      <Pressable
        onPress={handleSave}
        disabled={saving || !workerName || !daysWorked || !regularHours || !hourlyRate}
        style={[
          styles.saveButton,
          {
            backgroundColor: theme.secondary,
            opacity: saving || !workerName || !daysWorked || !regularHours || !hourlyRate ? 0.5 : 1,
          },
        ]}
        testID="button-save"
      >
        <ThemedText type="body" style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Payment'}
        </ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.xl,
  },
  label: {
    fontWeight: '500',
    marginBottom: Spacing.sm,
  },
  workerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  workerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
  },
  workerIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  workerName: {
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfField: {
    flex: 1,
  },
  thirdField: {
    flex: 1,
  },
  totalCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  totalRow: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  paidToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.lg,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    height: 52,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
