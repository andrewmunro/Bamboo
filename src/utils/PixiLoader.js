import platformHelper from 'helpers/PlatformHelper';

if(platformHelper.isClient()) {
    module.exports = require('../../node_modules/pixi.js');
} else {
    global.performance = { now: process.hrtime };
    global.requestAnimationFrame = (callback, element) => {
        let time = process.hrtime()[1];
        let nextCall = Math.max(0, 16 - (time - global.lastTime || 0));
        let id = setTimeout(() => callback(time + nextCall), nextCall);
        global.lastTime = time + nextCall;

        return id;
    };

    let pixi = {
        ticker: require('../../node_modules/pixi.js/src/core/ticker'),
        math: require('../../node_modules/pixi.js/src/core/math')
    };

    pixi.Point = pixi.math.Point;
    pixi.Matrix = pixi.math.Matrix;

    pixi.RenderTexture = pixi.Sprite = pixi.Rectangle =
    pixi.Container = function(){
        return {
            addChild:function(){},
            render:function(){}
        }
    };

    pixi.Texture = {
        fromImage: function(){}
    }

    pixi.loaders = {
        Loader: function() {
            return {
                add:function(){},
                once:function(){},
                load:function(){},
                loaded: true
            };
        }
    }

    pixi.autoDetectRenderer = function(width, height) {
        return {
            width: width,
            height: height,
            render:function(){}
        }
    };

    global.document = {
        getElementById:function(){}
    }

    module.exports = pixi;
}
