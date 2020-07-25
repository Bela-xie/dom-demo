window.dom = {
    create(string) {
        let container = document.createElement('template'); //因为template可以容纳所有元素，例如div就不能容纳td标签
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    before(node1, node2) {
        return node1.parentNode.insertBefore(node2, node1);
    },
    after(node1, node2) {
        return node1.parentNode.insertBefore(node2, node1.sibling); //没有直接可以在后面插元素的方法
    },
    append(parent, child) {
        return parent.appendChild(child)
    },
    wrap(node, parent) {
        dom.before(node, parent); //先将要添加的元素放在被添加元素之前，直接添加会将现有元素在页面上的位置移去
        dom.append(parent, node);
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node;
    },
    empty(node) { //也可以直接将innerHtml设置为空，但不好将移去的内容返回
        let x = node.firstChild;
        let arr = [];
        while (x) {
            arr.push(dom.remove(x));
            x = node.firstChild;
        }
        return arr;
    },
    attr(node, name, value) {
        if (arguments.length === 2) {
            return node.getAttribute(name);
        } else if (arguments.length === 3) {
            node.setAttribute(name, value);
        }
    },
    text(node, string) { //如果只有一个参数就读取内容，两个参数就修改内容，函数重载
        if (arguments.length === 1) {
            if ('innerText' in node) { //防止ie浏览器没有innerText属性
                return node.innerText;
            } else {
                return node.textContent;
            }
        } else if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string;
            } else {
                node.textContent = string;
            }
        }
    },
    html(node, string) {
        if (arguments.length === 1) {
            return node.innerHTML;
        } else if (arguments.length === 2) {
            node.innerHTML = string;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) { //(node,'width','40px')形式的修改
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]; //读取某个节点某个样式的属性值
            } else if (name instanceof Object) { //(node,'width:300px,height:100px')形式的修改
                for (let key in name) { //要在key前面加上let
                    node.style[key] = name[key];
                }
            }
        }
    },
    class: {
        add(node, name) {
            node.classList.add(name);
        },
        remove(node, name) {
            node.classList.remove(name);
        },
        has(node, name) {
            return node.classList.contains(name);
        }
    },
    on(node, event, f) {
        node.addEventListener(event, f)
    },
    off(node, event, f) {
        node.removeEventListener(event, f)
    },
    find(selector, scope) {
        return scope || document.querySelectorAll(selector); //scope的目的是找特定范围下的元素
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(value => value !== node);
    },
    next(node) {
        return node.nextElementSibling;
    },
    previous(node) {
        let x = node.previousSibling; //没有previousElementSibling属性
        while (x && x.nodeType === 3) {
            x = x.previousSibling;
        }
        return x;
    },
    each(nodes, f) {
        for (let i = 0; i < nodes.length; i++) {
            f.call(null, nodes[i]);
        }
    },
    index(node) {
        let i = 0;
        for (; i < node.parentNode.children.length; i++) {
            if (node.parentNode.children[i] === node) {
                break;
            }
        }
        return i;
    }
}