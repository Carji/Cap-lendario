const MixinGlobal = Base  =>  class extends Base{

};

const MixinInstance = Base  =>  class extends Base{
    
};

const Mixin =(classs,...args)=> args.reduce((a,b)=>b(a),classs);

export {
    MixinGlobal,
    MixinInstance,
    Mixin,
}