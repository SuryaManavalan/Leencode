import * as Haptics from 'expo-haptics';

/**
 * Utility functions for haptic feedback throughout the app
 */

// Light feedback for most common interactions
export const lightFeedback = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

// Medium feedback for more significant actions
export const mediumFeedback = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

// Heavy feedback for major actions
export const heavyFeedback = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

// Success feedback
export const successFeedback = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

// Warning feedback
export const warningFeedback = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};

// Error feedback
export const errorFeedback = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};
