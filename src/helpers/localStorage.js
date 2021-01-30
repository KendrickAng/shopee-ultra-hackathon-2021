export function setLiked(likedIds) {
    localStorage.setItem("liked", JSON.stringify(likedIds));
}

// returns null if key doesn't exist
export function getLiked() {
    const ret = JSON.parse(localStorage.getItem("liked"));
    if (!ret) {
        return [];
    }
    return ret;
}

export function setDisliked(dislikedIds) {
    localStorage.setItem("disliked", JSON.stringify(dislikedIds));
}

export function getDisliked() {
    const ret = JSON.parse(localStorage.getItem("disliked"));
    if (!ret) {
        return [];
    }
    return ret;
}

export function setHave(ingredients) {
    localStorage.setItem("have", JSON.stringify(ingredients));
}

export function getHave() {
    const ret = JSON.parse(localStorage.getItem("have"));
    if (!ret) {
        return [];
    }
    return ret;
}

export function setBuying(ingredients) {
    localStorage.setItem("buying", JSON.stringify(ingredients));
}

export function getBuying() {
    const ret = JSON.parse(localStorage.getItem("buying"));
    if (!ret) {
        return [];
    }
    return ret;
}
