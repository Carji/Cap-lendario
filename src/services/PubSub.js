export class PubSub {
    constructor () {
      this._subscriptor = new Map ()
    }  

    emit(chanel, data) {
      const chanelSubscriptors = this._subscriptor.get(chanel);
      if (chanelSubscriptors){
        chanelSubscriptors.forEach(s => {
          s(data)
        });
      }
    }
    on(chanel, handler) {
      const chanelSubscriptors = this._subscriptor.get(chanel);
      if (!chanelSubscriptors){
        chanelSubscriptors = [handler]
        this._subscriptor.set(chanelSubscriptors);
      } else {
        chanelSubscriptors.push(handler);
      }
      return () => {
        const index = chanelSubscriptors.indexOf(handler);
        if (index > -1) {
          chanelSubscriptors.splice(index, 1);
          if (chanelSubscriptors.length===0) {
            this._subscriptor.delete(chanel);
          }
        }
      };
    }

}