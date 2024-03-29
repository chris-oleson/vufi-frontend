<template>
    <v-row class="ma-2">
        <v-col v-if="lineChartData[0].data.length" cols="12">
            <LineChart :color="theme.current.value.colors.error" :series="lineChartData"/>
        </v-col>

        <v-col cols="12" md="7">
            <DataTable type="Debt" url="debts" :color="theme.current.value.colors.error" :tableData="tableData" :totalValue="store.totalDebtValue"/>
        </v-col>

        <v-col v-if="pieChart.values.length" cols="12" md="5">
            <PieChart :color="theme.current.value.colors.error" :series="pieChart.values" :labels="pieChart.labels"/>
        </v-col>
    </v-row>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '/src/pinia'
const store = useStore()
import { useTheme } from 'vuetify'
const theme = useTheme()
import DataTable from '/src/components/DataTable'
import PieChart from '/src/components/PieChart'
import LineChart from '/src/components/LineChart'

const tableData = computed(() => {
    return store.allItems.filter((item) => !item.is_deleted && item.type == 'debt')
})

const pieChart = computed(() => {
    let labels = []
    let values = []
    for (let item of store.allItems) {
        if (!item.hidden && !item.is_deleted && item.type == 'debt') {
            labels.push(item.name)
            values.push(parseFloat(item.value))
        }
    }
    
    return {
        labels: labels,
        values: values,
    }
})

const lineChartData = computed(() => {
    return [{
        name: 'Total Debts',
        data: refineHistory(store.allItems, store.allItemHistory)
    }]
})

function refineHistory(items, history) {
    // Get all individual debts
    let visibleDebts = []
    for (let item of items) {
        if (!item.hidden && item.type == 'debt') {
            visibleDebts.push({
                id: item.id,
                currency: item.currency,
                history: []
            })
        }
    }

    // Get all dates that there are records for
    let uniqueDates = []
    for (let entry of history) {
        if (!uniqueDates.includes(entry.date)) {
            uniqueDates.push(entry.date)
        }
    }
    uniqueDates = uniqueDates.sort()

    // Go through every visible debt
    for (let debt of visibleDebts) {
        for (let date of uniqueDates) {
            // Check if there is any value for that debt on that date, add it if there is.
            for (let entry of history) {
                if (entry.date == date && entry.item_id == debt.id) {
                    debt.history.push({
                        x: entry.date,
                        y: convertValue(parseFloat(entry.value), debt.currency)
                    })
                }
            }

            // If the debt doesn't have an entry for a date with data, add one with the previous value.
            if (!debt.history.some(e => e.x == date)) {
                if (debt.history.length) {
                    debt.history.push({
                        x: date,
                        y: parseFloat(debt.history[debt.history.length - 1].y)
                    })
                }
            }
        }
    }

    // Turn the debt data into something the line chart can read
    let refinedHistory = []
    for (let debt of visibleDebts) {
        for (let entry of debt.history) {
            let i = refinedHistory.findIndex(e => e.x == entry.x)
            if (i < 0) {
                refinedHistory.push(entry)
            }
            else {
                refinedHistory[i].y += entry.y
            }
        }
    }

    return refinedHistory
}

function convertValue(value, currency) {
    return value /= store.currencyRates[currency]
}
</script>