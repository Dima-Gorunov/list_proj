import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  FallbackComponent: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children, FallbackComponent } = this.props;

    if (hasError) {
      return FallbackComponent;
    }

    return children;
  }
}
