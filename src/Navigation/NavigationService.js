// NavigationService.js
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    console.log('Navigation not ready yet');
  }
}

export function resetStackAndNavigate(name, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name, params }],
    });
  } else {
    console.log('Navigation not ready yet, delaying...');
    // Delay retry
    setTimeout(() => resetStackAndNavigate(name, params), 500);
  }
}
