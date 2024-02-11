

const mapName = (name) => {
    switch(name) {
        case "stripped_mangroove_oak_logs":
        case "stripped_dark_oak_logs":
        case "stripped_birch_logs":
        case "stripped_cherry_logs":
        case "stripped_oak_logs":
        case "stripped_jungle_logs":
        case "stripped_acacia_logs":
        case "stripped_spruce_logs":
        case "mangroove_oak_logs":
        case "dark_oak_logs":
        case "birch_logs":
        case "cherry_logs":
        case "oak_logs":
        case "jungle_logs":
        case "acacia_logs":
        case "spruce_logs":
            return 'X'
        case "air":
            return ' '
        default:
            return '□'
    }
}


module.exports = {mapName}