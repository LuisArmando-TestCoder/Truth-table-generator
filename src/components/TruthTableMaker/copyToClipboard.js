const copyToClipboard = element => {
    if (document.createRange && window.getSelection) {
        const range = document.createRange();
        const selection = window.getSelection();

        selection.removeAllRanges();
        range.selectNodeContents(element);
        selection.addRange(range);
    }

    document.execCommand('Copy');
    element.blur()
};

export default copyToClipboard;