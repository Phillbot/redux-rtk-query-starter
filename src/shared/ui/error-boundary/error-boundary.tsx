import { Component, type ErrorInfo, type ReactNode } from 'react';

import { reportError } from '@/shared/api/error-reporter';

import styles from './error-boundary.module.scss';

type ErrorBoundaryProps = Readonly<{
  children: ReactNode;
}>;

type ErrorBoundaryState = Readonly<{
  hasError: boolean;
  error?: Error;
}>;

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(error, { componentStack: info.componentStack });
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h2 className={styles.errorBoundaryTitle}>Something went wrong.</h2>
          <p className={styles.errorBoundaryText}>Try refreshing the page or returning later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
