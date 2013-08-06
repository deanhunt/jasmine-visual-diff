function appendDiff(target, matches){
    // Note that we're displaying a diff so we don't do this twice.
    target.classList.add('showing-diff');

    // Mergely requires that we bind to an element with an ID. Naturally, such IDs
    // must be unique, and Date.now() should do for our purposes.
    target.setAttribute('id', 'id-' + Date.now());

    // Clear out the element for the new Mergely view.
    target.innerHTML = '';

    // Okay, at this point we *have* to use jQuery to satisfy Mergely.
    jQuery(target).mergely({
        // Empty string is specified as the disable value.
        fadein: '',
        editor_height: '300px',
        // HACK(dean): Minus the width of the margins and center canvas.
        editor_width: '-webkit-calc(50% - 24px)',
        cmsettings: {
            readOnly: false
        },
        lhs: function(setValue){
            setValue(matches[1]);
        },
        rhs: function(setValue){
            setValue(matches[2]);
        }
    });
}

document.body.addEventListener('click', function(evt){
    // Assuming we only care about the stack trace element itself, that it can't
    // contain other elements of interst.
    var target = evt.target;
    if (target.webkitMatchesSelector('.resultMessage')){
        // Bail out early if we're already showing a diff.
        if (target.classList.contains('showing-diff')) return;

        // Attempt to split our content into a before and after.
        // Note that we use the content from the stack trace, as the whitespace has been
        // preserved there.
        var stackTrace = target.nextElementSibling;
        var matches = stackTrace.innerText.match(/Expected \'([\s\S]+)\' to be \'([\s\S]+)\'/);

        // Ball out early if we don't have a way of extracting the comparison texts.
        if (!matches){
            console.log('We currently only support stack traces of the form: ' +
                '"Expected \'[something]\' to be \'[something]\'"');
            return
        }

        appendDiff(target, matches);
    }
});
