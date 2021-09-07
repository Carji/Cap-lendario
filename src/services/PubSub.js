export class PubSub {
  constructor() {
    this._subscriptor = new Map()
  }

  emit(chanel, data) {
    const chanelSubscriptors = this._subscriptor.get(chanel);
    if (chanelSubscriptors) {
      chanelSubscriptors.forEach(s => {
        s(data)
      });
    }
  }
  on(channel, handler) {
    let chanelSubscriptors = this._subscriptor.get(channel);
    if (!chanelSubscriptors) {
      chanelSubscriptors = [handler]
      this._subscriptor.set(channel, chanelSubscriptors);
    } else {
      chanelSubscriptors.push(handler);
    }
    return () => {
      const index = chanelSubscriptors.indexOf(handler);
      if (index > -1) {
        chanelSubscriptors.splice(index, 1);
        if (chanelSubscriptors.length === 0) {
          this._subscriptor.delete(channel);
        }
      }
    };
  }

}

export default new PubSub();