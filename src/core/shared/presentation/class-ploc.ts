type Subscription<S> = (state: S) => void;

abstract class PloC<S> {
  private internalState: S;
  private listeners: Subscription<S>[] = [];

  constructor(initalState: S) {
    this.internalState = initalState;
  }

  public get state(): S {
    return this.internalState;
  }

  changeState(state: S) {
    console.log(" <:> change state: ", this.internalState, "->", state);
    this.internalState = state;

    if (this.listeners.length > 0) {
      this.listeners.forEach((listener) => listener(this.state));
    }
  }

  subscribe(listener: Subscription<S>) {
    console.log(" :> add listener");
    this.listeners.push(listener);
  }

  unsubscribe(listener: Subscription<S>) {
    console.log(" <: remove listener");
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}

export default PloC;
