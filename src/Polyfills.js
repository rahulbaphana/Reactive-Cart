(function () {
    if (Array.prototype.findIndex) return;

    var findIndex = function (predicate) {
        var list = Object(this);
        var length = list.length;
        for(var i=0; i<length; i++){
            if(predicate(list[i])){
                return i;
            }
        }
        return -1;
    };

    if (Object.defineProperty) {
        try {
            Object.defineProperty(Array.prototype, 'findIndex', {
                value: findIndex, configurable: true, writable: true
            });
        } catch (e) {
        }
    }

    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = findIndex;
    }
}());

(function () {
    if (Array.prototype.replace) return;

    var replace = function (element, index) {
        var array = Object(this);
        if(index < 0 || index >= array.length){
            throw new Error("Index out of bounds!");
        }
        array[index] = element;
        return array;
    };

    if (Object.defineProperty) {
        try {
            Object.defineProperty(Array.prototype, 'replace', {
                value: replace, configurable: true, writable: true
            });
        }  catch (e) {
            console.log(e);
        }
    }

    if (!Array.prototype.replace) {
        Array.prototype.replace = replace;
    }
}());

(function () {
    if (Array.prototype.remove) return;

    var remove = function (index) {
        var array = Object(this);
        if(index < 0 || index >= array.length){
            throw new Error("Index out of bounds!");
        }
        return array.slice(0,index).concat(array.slice(index+1));
    };

    if (Object.defineProperty) {
        try {
            Object.defineProperty(Array.prototype, 'remove', {
                value: remove, configurable: true, writable: true
            });
        }  catch (e) {
            console.log(e);
        }
    }

    if (!Array.prototype.remove) {
        Array.prototype.remove = remove;
    }
}());