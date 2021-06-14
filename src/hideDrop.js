export function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
        if (node === parent) {
            return true
        }
        node = node.parentNode;
    }
    return false
}

export function hideDrop(e) {
    let clicked = e.target
    if (!isDescendant(document.querySelector('#dropdown'), clicked) && !clicked.id.includes('user-icon') && clicked.id !== 'dropdown') {
        let d = document.querySelector('#dropdown')
        if (d) {
            d.style.display = 'none'
        }
    }
}