import * as React from 'react';
export const NavigationRef: any = React.createRef();
import { StackActions } from '@react-navigation/native';

export function navigate(name: any, params: any) {
  if (NavigationRef.current) {
    NavigationRef.current.navigate(name, params);
  }
}

export function nestedNavigate(root: any, child: any, params: any) {
  if (NavigationRef.current) {
    NavigationRef.current.navigate(root, { screen: child, params: params });
  }
}

export function goBack() {
  if (NavigationRef.current) {
    NavigationRef.current.goBack();
  }
}

export function pop(count: number | undefined) {
  if (NavigationRef.current) {
    NavigationRef.current.dispatch(StackActions.pop(count));
  }
}

export function popToTop() {
  if (NavigationRef.current) {
    NavigationRef.current.dispatch(StackActions.popToTop());
  }
}

export function resetRoot(rootName: any) {
  if (NavigationRef.current) {
    NavigationRef.current.resetRoot({
      index: 0,
      routes: [{ name: rootName }],
    });
  }
}

export function push(...args: any[]) {
  if (NavigationRef.current) {
    NavigationRef.current.dispatch(StackActions.push(...(args as [any])));
  }
}
