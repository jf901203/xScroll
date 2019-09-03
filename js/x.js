window.xScroll = {

    "transitionTime": ".5",
    scroll: function (dom, maxTranslate, minTranslate, isVertical,touchendCallBackFun) {

        if(!maxTranslate)
            maxTranslate = 0;

        if(!minTranslate)
            throw "minTranslate : "+minTranslate;

        if("function" == typeof isVertical){
            touchendCallBackFun = isVertical;
            isVertical = false;
        }

        if (dom.jquery) {
            dom = dom[0];
        }

        dom.xInitParameters = {"xstart":0,"xdifference":0,"xisMove":false,"xmaxTranslate":maxTranslate,"xminTranslate":minTranslate
            ,"xisVertical" : isVertical,"xtouchendCallBackFun":touchendCallBackFun};
        dom.xScrollCoord = {"moveX": 0, "moveY": 0};

        dom.addEventListener("touchstart", function (e) {
            if (this.xInitParameters.xisVertical)
                this.xInitParameters.xstart = e.touches[0].clientY;
            else
                this.xInitParameters.xstart = e.touches[0].clientX;
        });

        dom.addEventListener("touchend", function (e) {
            if (!this.xInitParameters.xisMove) {
                return;
            }
            var orientation = undefined;

            if (this.xInitParameters.xisVertical) {
                if ((this.xScrollCoord.moveY + this.xInitParameters.xdifference) > this.xInitParameters.xmaxTranslate) {
                    this.xScrollCoord.moveY = this.xInitParameters.xmaxTranslate;
                    orientation = true;
                } else if ((this.xScrollCoord.moveY + this.xInitParameters.xdifference) < this.xInitParameters.xminTranslate) {
                    this.xScrollCoord.moveY = this.xInitParameters.xminTranslate;
                    orientation = false;
                } else {
                    this.xScrollCoord.moveY += this.xInitParameters.xdifference;
                }
                xScroll.xTrans.translateY(this, this.xScrollCoord.moveY);
            } else {
                if ((this.xScrollCoord.moveX + this.xInitParameters.xdifference) > this.xInitParameters.xmaxTranslate) {
                    this.xScrollCoord.moveX = this.xInitParameters.xmaxTranslate;
                    orientation = false;
                } else if ((this.xScrollCoord.moveX + this.xInitParameters.xdifference) < this.xInitParameters.xminTranslate) {
                    this.xScrollCoord.moveX = this.xInitParameters.xminTranslate;
                    orientation = true;
                } else {
                    this.xScrollCoord.moveX += this.xInitParameters.xdifference;
                }
                xScroll.xTrans.translateX(this, this.xScrollCoord.moveX);
            }
            xScroll.xTrans.addTransition(this, parseFloat(xScroll.transitionTime) + "s");
            this.xInitParameters.xisMove = false;

            if(this.xInitParameters.xtouchendCallBackFun && "function" == typeof this.xInitParameters.xtouchendCallBackFun)
                this.xInitParameters.xtouchendCallBackFun.call(this,e,orientation);
        });

        dom.addEventListener("touchmove", function (e) {
            this.xInitParameters.xisMove = true;
            xScroll.xTrans.removeTransition(this);
            if (this.xInitParameters.xisVertical) {
                var clientY = e.touches[0].clientY;
                this.xInitParameters.xdifference = clientY - this.xInitParameters.xstart;
                xScroll.xTrans.translateY(this, this.xScrollCoord.moveY + this.xInitParameters.xdifference);
            } else {
                var clientX = e.touches[0].clientX;
                this.xInitParameters.xdifference = clientX - this.xInitParameters.xstart;
                xScroll.xTrans.translateX(this, this.xScrollCoord.moveX + this.xInitParameters.xdifference);
            }
        });
    },
    xTrans: {
        translateX: function (dom, x) {
            dom.style["transform"] = "translateX(" + x + "px)";
            dom.style["webkitTransform"] = "translateX(" + x + "px)";
        },

        translateY: function (dom, y) {
            dom.style["transform"] = "translateY(" + y + "px)";
            dom.style["webkitTransform"] = "translateY(" + y + "px)";
        },

        removeTransition: function (dom) {
            dom.style.transition = "none";
            dom.style.webkitTransition = "none";
        },

        addTransition: function (dom, timer) {
            dom.style.transition = timer;
            dom.style.webkitTransition = timer;
        },
    },

    /**
     * 快速点击
     * @param dom
     * @param clallBackFun
     */
    onTip: function (dom, clallBackFun) {
        if (dom && typeof dom == "object") {
            dom.xonTipParameters = {"isMove":false,"timer":0,"clallBackFun":clallBackFun};
            dom.addEventListener("touchstart", function (e) {
                this.xonTipParameters.timer = Date.now();
                this.xonTipParameters.isMove = false;
            });

            dom.addEventListener("touchmove", function (e) {
                this.xonTipParameters.isMove = true;
            });

            dom.addEventListener("touchend", function (e) {
                if (!this.xonTipParameters.isMove && Date.now() - this.xonTipParameters.timer < 80 && this.xonTipParameters.clallBackFun && "function" == typeof this.xonTipParameters.clallBackFun) {
                    this.xonTipParameters.clallBackFun.call(this, e);
                }
            });
        }
    }

}

 
