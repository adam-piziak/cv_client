export const suitName = (cardNum) => {
    switch(cardNum) {
        case 0: return "clubs";
        case 1: return "diamonds";
        case 2: return "hearts";
        case 3: return "spades";
        default: return "?";
    }
}
