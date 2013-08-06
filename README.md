jasmine-visual-diff
===================

Side-by-side diffing for Jasmine string comparisons. 

Quick hack leaning on https://github.com/wickedest/Mergely and its dependencies (Code Mirror, jQuery).


Installation
------------

* Grab the source with a `git clone https://github.com/deanhunt/jasmine-visual-diff.git`
* Visit chrome://extensions; navigate to the repo and load its entire folder (including `manifest.json`).
* Check "Enable in Incognito Mode" if it pleases you.


Limitations
-----------

* Only works on URLs container the text SpecRunner.html
* Only currently recognizes the form "Expected 'something' to be 'something else'"
* Mergely has a viral license so it's not embeddable directly within application code (thus the extension)

