import React, { useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Pressable, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { InputField } from '@/components/InputField';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, BorderRadius } from '@/constants/theme';
import { MaterialEstimate } from '@/types';
import {
  calculateMaterials,
  saveMaterialEstimate,
  getMaterialEstimates,
  deleteMaterialEstimate,
  generateId,
  formatDate,
} from '@/lib/storage';

export default function MaterialCalculatorScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [projectName, setProjectName] = useState('');
  const [area, setArea] = useState('');
  const [floors, setFloors] = useState('1');
  const [estimates, setEstimates] = useState<MaterialEstimate[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [calculated, setCalculated] = useState<{
    cement: number;
    sand: number;
    bricks: number;
    steel: number;
    aggregate: number;
  } | null>(null);

  const loadEstimates = useCallback(async () => {
    const data = await getMaterialEstimates();
    setEstimates(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadEstimates();
    }, [loadEstimates])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEstimates();
    setRefreshing(false);
  };

  const handleCalculate = () => {
    const areaNum = parseFloat(area) || 0;
    const floorsNum = parseInt(floors) || 1;
    if (areaNum <= 0) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const result = calculateMaterials(areaNum, floorsNum);
    setCalculated(result);
  };

  const handleSave = async () => {
    if (!calculated || !projectName) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const estimate: MaterialEstimate = {
      id: generateId(),
      name: projectName,
      area: parseFloat(area),
      floors: parseInt(floors) || 1,
      ...calculated,
      createdAt: new Date().toISOString(),
    };

    await saveMaterialEstimate(estimate);
    await loadEstimates();
    setProjectName('');
    setArea('');
    setFloors('1');
    setCalculated(null);
  };

  const handleDelete = async (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await deleteMaterialEstimate(id);
    await loadEstimates();
  };

  const materialItems = calculated ? [
    { icon: 'package', label: 'Cement', value: `${calculated.cement} bags`, color: '#78909C' },
    { icon: 'layers', label: 'Sand', value: `${calculated.sand} cft`, color: '#FFB74D' },
    { icon: 'grid', label: 'Bricks', value: `${calculated.bricks} pcs`, color: '#EF5350' },
    { icon: 'tool', label: 'Steel', value: `${calculated.steel} kg`, color: '#42A5F5' },
    { icon: 'box', label: 'Aggregate', value: `${calculated.aggregate} cft`, color: '#9E9E9E' },
  ] : [];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={[styles.card, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText type="h4" style={styles.cardTitle}>Calculate Materials</ThemedText>
        
        <InputField
          label="Project Name"
          value={projectName}
          onChangeText={setProjectName}
          placeholder="e.g., Building A"
          testID="input-project-name"
        />

        <View style={styles.row}>
          <View style={styles.halfField}>
            <InputField
              label="Area (sq ft)"
              value={area}
              onChangeText={setArea}
              placeholder="1000"
              keyboardType="numeric"
              testID="input-area"
            />
          </View>
          <View style={styles.halfField}>
            <InputField
              label="Floors"
              value={floors}
              onChangeText={setFloors}
              placeholder="1"
              keyboardType="numeric"
              testID="input-floors"
            />
          </View>
        </View>

        <Pressable
          onPress={handleCalculate}
          disabled={!area}
          style={[
            styles.calculateButton,
            {
              backgroundColor: theme.primary,
              opacity: !area ? 0.5 : 1,
            },
          ]}
          testID="button-calculate"
        >
          <Feather name="zap" size={20} color="#FFFFFF" />
          <ThemedText type="body" style={styles.buttonText}>
            Calculate
          </ThemedText>
        </Pressable>
      </View>

      {calculated ? (
        <View style={[styles.resultsCard, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText type="h4" style={styles.cardTitle}>Materials Required</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary, marginBottom: Spacing.md }}>
            For {area} sq ft x {floors} floor(s) = {parseFloat(area) * parseInt(floors)} sq ft total
          </ThemedText>

          {materialItems.map((item) => (
            <View key={item.label} style={styles.materialRow}>
              <View style={[styles.materialIcon, { backgroundColor: `${item.color}20` }]}>
                <Feather name={item.icon as any} size={20} color={item.color} />
              </View>
              <ThemedText type="body" style={styles.materialLabel}>{item.label}</ThemedText>
              <ThemedText type="h4" style={{ color: item.color }}>{item.value}</ThemedText>
            </View>
          ))}

          <Pressable
            onPress={handleSave}
            disabled={!projectName}
            style={[
              styles.saveButton,
              {
                backgroundColor: theme.secondary,
                opacity: !projectName ? 0.5 : 1,
              },
            ]}
            testID="button-save-estimate"
          >
            <Feather name="save" size={20} color="#FFFFFF" />
            <ThemedText type="body" style={styles.buttonText}>
              Save Estimate
            </ThemedText>
          </Pressable>
        </View>
      ) : null}

      {estimates.length > 0 ? (
        <View style={styles.historySection}>
          <ThemedText type="h4" style={styles.sectionTitle}>Saved Estimates</ThemedText>
          
          {estimates.map((estimate) => (
            <View
              key={estimate.id}
              style={[styles.estimateCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <View style={styles.estimateHeader}>
                <View>
                  <ThemedText type="body" style={{ fontWeight: '600' }}>
                    {estimate.name}
                  </ThemedText>
                  <ThemedText type="small" style={{ color: theme.textSecondary }}>
                    {estimate.area} sq ft x {estimate.floors} floor(s) | {formatDate(estimate.createdAt)}
                  </ThemedText>
                </View>
                <Pressable
                  onPress={() => handleDelete(estimate.id)}
                  style={styles.deleteButton}
                  testID={`delete-estimate-${estimate.id}`}
                >
                  <Feather name="trash-2" size={18} color={theme.error} />
                </Pressable>
              </View>
              <View style={styles.estimateMaterials}>
                <View style={styles.materialChip}>
                  <ThemedText type="caption">Cement: {estimate.cement}</ThemedText>
                </View>
                <View style={styles.materialChip}>
                  <ThemedText type="caption">Sand: {estimate.sand}</ThemedText>
                </View>
                <View style={styles.materialChip}>
                  <ThemedText type="caption">Bricks: {estimate.bricks}</ThemedText>
                </View>
                <View style={styles.materialChip}>
                  <ThemedText type="caption">Steel: {estimate.steel}</ThemedText>
                </View>
                <View style={styles.materialChip}>
                  <ThemedText type="caption">Aggregate: {estimate.aggregate}</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfField: {
    flex: 1,
  },
  calculateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: BorderRadius.sm,
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resultsCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  materialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  materialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  materialLabel: {
    flex: 1,
    fontWeight: '500',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: BorderRadius.sm,
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  historySection: {
    marginTop: Spacing.md,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  estimateCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  estimateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  deleteButton: {
    padding: Spacing.sm,
  },
  estimateMaterials: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  materialChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
});
