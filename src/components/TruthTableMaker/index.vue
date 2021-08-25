<template>
    <header>
        <h3>Conectores lógicos disponibles</h3>
        <pre>{{
            JSON.stringify(
                Object.fromEntries(
                    Object.entries(logicConnectors)
                    .map(([key, value]) => [key, value.toString()])
                ),
                null,
                4
            ).replace(/\\n/g, '')
        }}</pre>
    </header>
    <input type="text" @input="event => {
        updateTable(event.target.value)
    }"/>
    <table>
        <tr>
            <th v-for="
                    key of Object.keys(table)
                "
                :key="key"
            >
                {{key}}
            </th>
        </tr>
        <tr
            v-for="
                index of new Array(
                    table[Object.keys(table)[0]]?.length
                ).keys()
            "
            :key="index"
        >
            <td v-for="
                    (key, keyIndex) of Object.keys(table)
                "
                :key="key + index + keyIndex"
                @mouseover="() => setPassingIndex(keyIndex)"
                :class="keyIndex === passingIndex && 'highlight'"
            >
                {{table[key][index]}}
            </td>
        </tr>
    </table>
</template>

<script>
import getTruthTable, {logicConnectors} from './getTruthTable'

export default {
    name: 'truth-table',
    props: {
        defaultProposition: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            logicConnectors,
            passingIndex: null,
            proposition: this.defaultProposition,
            table: {}
        }
    },
    methods: {
        setPassingIndex(keyIndex) {
            this.passingIndex = keyIndex
        },
        updateTable(value) {
            try {
                const truthTable = getTruthTable(value || this.proposition)

                this.table = truthTable
            } catch {
                this.table = {}
            }
        },
    },
    mounted() {
        this.updateTable()
    }
}
</script>

<style>
table {
    border-collapse: collapse;
    border-style: hidden;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 5px 15px -10px #000;
}

th, td {
    border: 0 solid var(--shadow);
    padding: var(--spacing);
    text-align: center;
}

th.highlight, td.highlight {
    background: var(--shadow);
}

th, table {
    border-radius: 5px;
}

td {
    border-width: 0 0 1px;
}

tr:first-child {
    position: sticky;
    top: 0;
    background: #fff;
    box-shadow: 0 5px 10px -10px #000;
}

tr:hover td {
    background: var(--shadow);
}

td, td::before {
    box-shadow: 0 0 0 0;
    transition: 0.15s;
}

tr td:hover {
    transform: scale(1.1);
    background: #ddd;
}

td:hover, td:hover::before {
    border-radius: 5px;
    transition: 0.3s;
}

td:hover::before {
    content: '';
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 10px -10px #000;
    position: absolute;
    top: 0;
    left: 0;
}

input {
    border: 0;
    outline: none;
    border-bottom: 1px solid var(--shadow);
    width: 300px;
    padding: 15px 20px;
    margin-bottom: var(--spacing);
    border-radius: 5px;
    box-shadow: 0 10px 5px -5px #eee;
}

input:hover, input:focus {
    background: var(--shadow);
}
</style>