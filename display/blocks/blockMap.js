

const mapName = (name) => {
    switch(name) {
        case "stripped_mangroove_oak_log":
        case "stripped_dark_oak_log":
        case "stripped_birch_log":
        case "stripped_cherry_log":
        case "stripped_oak_log":
        case "stripped_jungle_log":
        case "stripped_acacia_log":
        case "stripped_spruce_log":
        case "mangroove_oak_log":
        case "dark_oak_log":
        case "birch_log":
        case "cherry_log":
        case "oak_log":
        case "jungle_log":
        case "acacia_log":
        case "spruce_log":
            return '#'
        case "mangroove_oak_fence":
        case "dark_oak_fence":
        case "birch_fence":
        case "cherry_fence":
        case "oak_fence":
        case "jungle_fence":
        case "acacia_fence":
        case "spruce_fence":
            return 'l'
        case "cobblestone":
            return '□'
        case "spruce_planks":
            return '='
        case "chest":
        case "ender_chest":
            return '?'
        case "ladder":
            return '^'
        case "air":
            return ' '
        case "water":
            return '~'
        default:
            return '█'
    }
}


module.exports = {mapName}