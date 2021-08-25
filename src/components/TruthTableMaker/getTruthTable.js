export const logicConnectors = {
    'o': (x, y) => x || y,
    'y': (x, y) => x && y,
    '#': (x, y) => x ^ y,
    '%': (x, y) => !(x ^ y),
    '>': (x, y) => x == false || y,
}
const logicKeys = Object.keys(logicConnectors).join('')

// To support variable negated variables
const maximumSingleExpressionLength = 2
// Extract A from !A and set negated dependant

function getSplitProposition(proposition) {
    const searchResults = /\((.*)\)/g.exec(proposition)
    const mainResult = searchResults[searchResults.length - 1]

    const resultParts = [
    ...new Set(
        new RegExp(
            `^((\\(.*\\))|(.*)) [${logicKeys}] ((\\(.*\\))|(.*))$`, 'g'
        )
        .exec(mainResult)
        .slice(1)
    )
    ].filter(x => x)

    return [mainResult, resultParts]
}

function getGroups(mainGroup, groups = []) {
    const [mainResult, resultParts] = getSplitProposition(mainGroup)

    groups.push(mainResult)

    for (const resultPart of resultParts) {
        if (new RegExp(`[${logicKeys}]`, 'g').test(resultPart)) {
            getGroups(resultPart, groups)

            continue
        }

        groups.push(resultPart)
    }

    return groups
}

function getLogicAnswer(proposition) {
    const [x, logicalConnector, y] = proposition.split(' ')

    const logicAnswer = !!(
        logicConnectors[logicalConnector](
            Number(x),
            Number(y)
        )
    )

    return +logicAnswer
}

function getIndependents(groups) {
    return groups.filter(element => element.length <= maximumSingleExpressionLength)
}

function getDependents(groups) {
    return groups.filter(element => element.length > maximumSingleExpressionLength).sort(
        (a, b) => a.length - b.length
    )
}

function getBinariesTable(independents) {
    const table = {}

    for (let x = 0; independents[x]; x++) {
        if (!table[independents[x]]) {
            table[independents[x]] = []
        }

        const base = 2

        for (let y = 0; y < base ** independents.length; y++) {
            table[independents[x]].push(
                ((y / (base ** x)) % base) << 0
            )
        }
    }

    return table
}

function getReplacedLogicProposition(
    proposition, // 'P ˅ Q'
    replacements // {P: 0, Q: 1}
) {
    let newProposition = proposition

    const replacementKeys = Object.keys(replacements).sort(
        (a, b) => b.length - a.length
    )

    replacementKeys.forEach(replacement => {
        newProposition = newProposition.replace(
            replacement,
            replacements[replacement]
        )
    })

    return newProposition // '0 ˅ 1'
}

function getTableDependantReplacements({table, dependent, index}) {
    return Object.fromEntries(
        Object.keys(table)
        .filter(temporalProposition => temporalProposition !== dependent)
        .map(temporalProposition => [
            temporalProposition.length > maximumSingleExpressionLength ?
                `(${temporalProposition})` : temporalProposition,
            table[temporalProposition][index]
        ])
    )
}

export default function getTable(proposition) {
    const groups = getGroups(`(${proposition})`)
    const independents = getIndependents(groups)
    const dependents = getDependents(groups)
    const table = getBinariesTable(independents)
    const [independent] = independents

    dependents.forEach(dependent => {
        table[dependent] = []

        for (
            let index = 0;
            index < table[independent].length;
            index++
        ) {
            const replacements = getTableDependantReplacements({table, dependent, index})
            const factualProposition = getReplacedLogicProposition(dependent, replacements)
            const logicAnswer = getLogicAnswer(factualProposition)

            table[dependent].push(logicAnswer)

            continue
        }
    })

    return table
}
