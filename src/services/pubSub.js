export class PubSub {
  constructor() {
    this._subscriptor = new Map()
  }

  emit(channel, data) {
    const channelSubscriptors = this._subscriptor.get(channel);
    if (channelSubscriptors) {
      channelSubscriptors.forEach(s => {
        s(data)
      });
    }
  }
  on(channel, handler) {
    let channelSubscriptors = this._subscriptor.get(channel);
    if (!channelSubscriptors) {
      channelSubscriptors = [handler]
      this._subscriptor.set(channel, channelSubscriptors);
    } else {
      channelSubscriptors.push(handler);
    }
    return () => {
      const index = channelSubscriptors.indexOf(handler);
      if (index > -1) {
        channelSubscriptors.splice(index, 1);
        if (channelSubscriptors.length === 0) {
          this._subscriptor.delete(channel);
        }
      }
    };
  }
  dispose() {
    this.map = null;
  }
}