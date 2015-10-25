/* jshint maxlen: 100 */
/* global
    manipulationTestHelper,
    prepareUnitTestModule,
    skipKeyboardShortcutTests,
    SKIP_THIS_TEST,
    test,
    expectOneMore,
    simulateKeyCombo,
    stop,
    start,
    strictEqual,
    ok,
    IMG_SRC
*/
'use strict';

module("images-resize_handle", {setup: prepareUnitTestModule});

test("Resize handle is added on image `mousemove`", function () {
    manipulationTestHelper({
        startHtml: '<p><img src="' + IMG_SRC +'" /></p>',
        manipulationFunc: function (wymeditor) {
            wymeditor.$body().find('img').mousemove();
        },
        additionalAssertionsFunc: function (wymeditor) {
            var $resizeHandle = wymeditor.$body().find('div');
            expectOneMore();
            ok($resizeHandle.hasClass('wym-resize-handle'));
        }
    });
});

test("resize handle is immediately after image", function () {
    manipulationTestHelper({
        startHtml: '<p><img src="' + IMG_SRC +'" /></p>',
        manipulationFunc: function (wymeditor) {
            wymeditor.$body().find('img').mousemove();
        },
        additionalAssertionsFunc: function (wymeditor) {
            var $resizeHandle = wymeditor.$body().find('div');
            expectOneMore();
            ok($resizeHandle.prev('img').length);
        }
    });
});

test("resize handle has editor-only class", function () {
    manipulationTestHelper({
        startHtml: '<p><img src="' + IMG_SRC +'" /></p>',
        manipulationFunc: function (wymeditor) {
            wymeditor.$body().find('img').mousemove();
        },
        additionalAssertionsFunc: function (wymeditor) {
            var $resizeHandle = wymeditor.$body().find('div');
            expectOneMore();
            ok($resizeHandle.hasClass('wym-editor-only'));
        }
    });
});

test("resize handle removed on `mousemove` outside image and handle", function () {
    manipulationTestHelper({
        startHtml: '<p><img src="' + IMG_SRC +'" /></p>',
        manipulationFunc: function (wymeditor) {
            wymeditor.$body().find('img')
                .mousemove()
                .parent().mousemove();
        },
        additionalAssertionsFunc: function (wymeditor) {
            expectOneMore();
            strictEqual(wymeditor.$body().find('div').length, 0);
        }
    });
});

test("resize handle not removed on `mousemove` over handle", function () {
    manipulationTestHelper({
        startHtml: '<p><img src="' + IMG_SRC +'" /></p>',
        manipulationFunc: function (wymeditor) {
            wymeditor.$body().find('img')
                .mousemove()
                .next().mousemove();
        },
        additionalAssertionsFunc: function (wymeditor) {
            expectOneMore();
            strictEqual(wymeditor.$body().find('div').length, 1);
        }
    });
});

test("resize handle with no image is removed async after 'keypress'", function () {
    manipulationTestHelper({
        startHtml: '<p><img src="' + IMG_SRC +'" /></p>',
        setCaretInSelector: 'p',
        manipulationFunc: function (wymeditor) {
            wymeditor.$body().find('img').mousemove().remove();
            simulateKeyCombo(wymeditor, 'a');
        },
        additionalAssertionsFunc: function (wymeditor) {
            expectOneMore();
            stop();
            setTimeout(function () {
                start();
                strictEqual(wymeditor.$body().find('div').length, 0);
            }, 0);
        },
        skipFunc: function () {
            if (skipKeyboardShortcutTests) {
                return SKIP_THIS_TEST;
            }
        }
    });
});

test("resize handle with no image removed on `mousemove`", function () {
    manipulationTestHelper({
        startHtml: '<p><img src="' + IMG_SRC +'" /></p>',
        manipulationFunc: function (wymeditor) {
            wymeditor.$body().find('img')
                .mousemove()
                .remove();
            wymeditor.$body().find('.wym-resize-handle').mousemove();
        },
        additionalAssertionsFunc: function (wymeditor) {
            expectOneMore();
            strictEqual(wymeditor.$body().find('div').length, 0);
        }
    });
});
