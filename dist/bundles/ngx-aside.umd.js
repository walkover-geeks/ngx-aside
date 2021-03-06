(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/animations', '@angular/common'], factory) :
	(factory((global['ngx-aside'] = {}),global.ng.core,global.ng.animations,global.ng.common));
}(this, (function (exports,core,animations,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxOverlayComponent = /** @class */ (function () {
    function NgxOverlayComponent() {
        this.showStatus = true;
    }
    /**
     * @return {?}
     */
    NgxOverlayComponent.prototype.ngAfterContentInit = function () {
    };
    return NgxOverlayComponent;
}());
NgxOverlayComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ngx-aside-overlay',
                template: "\n        <div class=\"overlay\" [@show]=\"showStatus\"></div>",
                styles: [".overlay {\n        z-index: 1;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: currentColor;\n        opacity: .6;\n    }"],
                animations: [
                    animations.trigger('show', [
                        animations.transition('void => *', [
                            animations.style([{ opacity: 0 }]),
                            animations.animate(100, animations.style([{ opacity: .6 }]))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
NgxOverlayComponent.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var slideAnimations = core.trigger('slide', [
    core.transition('void => left', [
        core.style({
            opacity: .6,
            transform: 'translate3d(-100%,0,0)'
        }),
        core.animate('.2s cubic-bezier(0.215, 0.610, 0.355, 1)', core.style({
            opacity: 1,
            transform: 'translateZ(0)'
        }))
    ]),
    core.transition('void => right', [
        core.style({
            opacity: .6,
            transform: 'translate3d(100%,0,0)'
        }),
        core.animate('.2s cubic-bezier(0.215, 0.610, 0.355, 1)', core.style({
            opacity: 1,
            transform: 'translateZ(0)'
        }))
    ]),
    core.transition('left => void', [
        core.animate('.2s cubic-bezier(0.165, 0.84, 0.44, 1)', core.style({
            opacity: 0,
            transform: 'translate3d(-50%,0,0)'
        }))
    ]),
    core.transition('right => void', [
        core.animate('.2s cubic-bezier(0.165, 0.84, 0.44, 1)', core.style({
            opacity: 0,
            transform: 'translate3d(50%,0,0)'
        }))
    ])
]);
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 TODO: Configurable parameters
 width
 max-width
 TODO: @OutputEvents
 @OutputFunctions ?
 ----
 */
var NgxAsideComponent = /** @class */ (function () {
    /**
     * @param {?} _resolver
     * @param {?} vcRef
     */
    function NgxAsideComponent(_resolver, vcRef) {
        this._resolver = _resolver;
        this.vcRef = vcRef;
        this.cancel = new core.EventEmitter();
        this.submit = new core.EventEmitter();
        this.position = 'right';
        this.showOverlay = true;
        this.closeOnEscape = true;
        this.showDefaultFooter = true;
        this.showDefaultHeader = true;
        this.title = '';
        this.cancelButtonTitle = 'Cancel';
        this.submitButtonTitle = 'Submit';
        this.visibleStatus = false;
        this.rootViewContainerRef = vcRef;
    }
    /**
     * @return {?}
     */
    NgxAsideComponent.prototype.addOverlay = function () {
        if (!this.backdrop && this.showOverlay) {
            var /** @type {?} */ OverlayComponentFactory = this._resolver.resolveComponentFactory(NgxOverlayComponent);
            this.backdrop = this.rootViewContainerRef.createComponent(OverlayComponentFactory, 0);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxAsideComponent.prototype.hideAside = function (event) {
        if (this.cancel.observers.length > 0) {
            this.cancel.emit(event);
        }
        else {
            // If we don`t have any subscribers
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    NgxAsideComponent.prototype.submitAside = function () {
        if (this.cancel.observers.length > 0) {
            this.submit.emit();
        }
        else {
            // If we don`t have any subscribers
            this.hide();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxAsideComponent.prototype.handleEscape = function (event) {
        if (this.closeOnEscape) {
            event.preventDefault();
            this.hideAside(event);
        }
        return false;
    };
    /**
     * @return {?}
     */
    NgxAsideComponent.prototype.hide = function () {
        this.visibleStatus = false;
        if (!this.backdrop) {
            return;
        }
        this.backdrop.destroy();
        this.backdrop = void 0;
    };
    /**
     * @return {?}
     */
    NgxAsideComponent.prototype.show = function () {
        this.visibleStatus = true;
        this.addOverlay();
    };
    return NgxAsideComponent;
}());
NgxAsideComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ngx-aside',
                template: "<aside [@slide]=\"position\" *ngIf=\"visibleStatus\" [className]=\"position\">\n    <!-- Custom Header -->\n    <ng-content *ngIf=\"!showDefaultHeader\" class=\"aside-title-huj\" select=\"header\">\n    </ng-content>\n    <!-- End Custom Header -->\n    <!-- Default Header -->\n    <header *ngIf=\"showDefaultHeader\">\n        <div class=\"aside-title\">\n            {{title}}\n        </div>\n        <div (click)=\"hideAside()\" class=\"aside-button-close\">\n            &times;\n        </div>\n    </header>\n    <!-- End Custom Header -->\n    <section>\n        <div class=\"aside-container\">\n            <ng-content></ng-content>\n        </div>\n    </section>\n    <!-- Custom Footer -->\n    <ng-content *ngIf=\"!showDefaultFooter\" select=\"footer\"></ng-content>\n    <!-- End Custom Footer -->\n    <!-- Default Footer -->\n    <footer *ngIf=\"showDefaultFooter\">\n        <button (click)=\"hideAside($event)\" type=\"button\" class=\"btn btn-secondary btn-cancel\">\n         {{cancelButtonTitle}}</button>\n        <button (click)=\"submitAside($event)\" type=\"button\" class=\"btn btn-primary btn-submit\">{{submitButtonTitle}}</button>\n    </footer>\n    <!--End  Default Footer -->\n</aside>",
                styles: [":host *{\n  -webkit-box-sizing:border-box;\n          box-sizing:border-box; }\n:host aside.right{\n  right:0;\n  top:0;\n  bottom:0; }\n:host aside.left{\n  left:0;\n  top:0;\n  bottom:0; }\naside{\n  will-change:opacity;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-orient:vertical;\n  -webkit-box-direction:normal;\n      -ms-flex-direction:column;\n          flex-direction:column;\n  -webkit-box-align:stretch;\n      -ms-flex-align:stretch;\n          align-items:stretch;\n  position:fixed;\n  width:auto;\n  max-width:50%;\n  background-color:white;\n  z-index:2;\n  -webkit-box-shadow:-6px 3px 11px 0px rgba(0, 0, 0, 0.23);\n          box-shadow:-6px 3px 11px 0px rgba(0, 0, 0, 0.23);\n  padding:0 16px;\n  height:100vh; }\nsection{\n  overflow:auto;\n  -webkit-box-flex:1;\n      -ms-flex-positive:1;\n          flex-grow:1; }\nheader{\n  font-size:20px;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-orient:horizontal;\n  -webkit-box-direction:normal;\n      -ms-flex-direction:row;\n          flex-direction:row;\n  -webkit-box-pack:justify;\n      -ms-flex-pack:justify;\n          justify-content:space-between;\n  -webkit-box-align:center;\n      -ms-flex-align:center;\n          align-items:center;\n  width:100%;\n  height:64px;\n  -ms-flex-negative:0;\n      flex-shrink:0; }\n  header .aside-button-close{\n    width:20px;\n    text-align:center;\n    opacity:.8; }\n    header .aside-button-close:hover{\n      cursor:pointer;\n      opacity:1; }\nfooter{\n  -ms-flex-negative:0;\n      flex-shrink:0;\n  border-top:1px solid #e5e5e5;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-align:start;\n      -ms-flex-align:start;\n          align-items:flex-start;\n  padding:16px 0 16px 0; }\n  footer button{\n    margin-right:6px; }\n  .left footer{\n    -webkit-box-pack:end;\n        -ms-flex-pack:end;\n            justify-content:flex-end; }\n  .right footer{\n    -webkit-box-pack:start;\n        -ms-flex-pack:start;\n            justify-content:flex-start; }\n:host.left aside{\n  -webkit-box-shadow:6px -1px 11px 0px rgba(0, 0, 0, 0.23);\n          box-shadow:6px -1px 11px 0px rgba(0, 0, 0, 0.23); }\n:host.left.footer{\n  -webkit-box-pack:end;\n      -ms-flex-pack:end;\n          justify-content:flex-end; }\n"],
                animations: [slideAnimations]
            },] },
];
/** @nocollapse */
NgxAsideComponent.ctorParameters = function () { return [
    { type: core.ComponentFactoryResolver, },
    { type: core.ViewContainerRef, },
]; };
NgxAsideComponent.propDecorators = {
    "cancel": [{ type: core.Output },],
    "submit": [{ type: core.Output },],
    "position": [{ type: core.Input },],
    "showOverlay": [{ type: core.Input },],
    "closeOnEscape": [{ type: core.Input },],
    "showDefaultFooter": [{ type: core.Input },],
    "showDefaultHeader": [{ type: core.Input },],
    "title": [{ type: core.Input },],
    "cancelButtonTitle": [{ type: core.Input },],
    "submitButtonTitle": [{ type: core.Input },],
    "handleEscape": [{ type: core.HostListener, args: ['document:keydown.esc', ['$event'],] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxAsideModule = /** @class */ (function () {
    function NgxAsideModule() {
    }
    return NgxAsideModule;
}());
NgxAsideModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                exports: [NgxAsideComponent],
                declarations: [
                    NgxAsideComponent,
                    NgxOverlayComponent,
                ],
                entryComponents: [NgxOverlayComponent]
            },] },
];
/** @nocollapse */
NgxAsideModule.ctorParameters = function () { return []; };

exports.NgxAsideModule = NgxAsideModule;
exports.ɵb = slideAnimations;
exports.ɵa = NgxAsideComponent;
exports.ɵc = NgxOverlayComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-aside.umd.js.map
