// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: Record<string, ComponentProps<typeof MaterialIcons>["name"]> = {
  // Navigation
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "xmark": "close",
  "gear": "settings",
  
  // Vehicles
  "car.fill": "directions-car",
  "car": "directions-car",
  
  // People
  "person.fill": "person",
  "person": "person",
  "person.badge.plus": "person-add",
  "person.badge.check": "how-to-reg",
  "person.2.fill": "people",
  
  // Security & Access
  "lock.fill": "lock",
  "lock.open.fill": "lock-open",
  "key.fill": "vpn-key",
  "shield.fill": "security",
  "checkmark.shield.fill": "verified-user",
  
  // Actions
  "plus": "add",
  "plus.circle.fill": "add-circle",
  "checkmark": "check",
  "checkmark.circle.fill": "check-circle",
  "xmark.circle.fill": "cancel",
  "pencil": "edit",
  "trash.fill": "delete",
  
  // Communication
  "bell.fill": "notifications",
  "bell": "notifications-none",
  "message.fill": "message",
  "phone.fill": "phone",
  
  // QR Code & Scanning
  "qrcode": "qr-code",
  "qrcode.viewfinder": "qr-code-scanner",
  "camera.fill": "camera-alt",
  "doc.text.viewfinder": "document-scanner",
  
  // Time & Calendar
  "clock.fill": "schedule",
  "clock": "schedule",
  "calendar": "calendar-today",
  "calendar.badge.plus": "event",
  
  // Documents & Reports
  "doc.fill": "description",
  "doc.text.fill": "article",
  "chart.bar.fill": "bar-chart",
  "list.bullet": "list",
  
  // Status
  "exclamationmark.triangle.fill": "warning",
  "info.circle.fill": "info",
  "questionmark.circle.fill": "help",
  
  // Misc
  "eye.fill": "visibility",
  "eye.slash.fill": "visibility-off",
  "magnifyingglass": "search",
  "arrow.right": "arrow-forward",
  "arrow.left": "arrow-back",
  "building.2.fill": "business",
  "location.fill": "location-on",
  "wrench.fill": "build",
  "star.fill": "star",
  "photo.fill": "photo",
};

type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
