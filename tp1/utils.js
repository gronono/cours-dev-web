export function setBooleanAttribute(component, attributeName, value) {
    if (value || value === '') {
        // console.log('set bool', component, attributeName, value)
        component.setAttribute(attributeName, '');
    } else {
        // console.log('remove bool', component, attributeName, value)
        component.removeAttribute(attributeName);
    }
}

export function toggleBooleanAttribute(component, attributeName) {
    setBooleanAttribute(component, attributeName, !component.hasAttribute(attributeName));
}

export function generateAllLetters() {
    const letters = [];
    for (let letter = 'A'.charCodeAt(0); letter <= 'Z'.charCodeAt(0); letter++) {
        letters.push(String.fromCharCode(letter));
    }
    return letters;
}
