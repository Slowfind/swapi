/* immport libraries */
import React from 'react'
import moment from 'moment'

/* import components */
import { requestData } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function Planets() {
    const [page, setPage] = React.useState(1)
    const [state, setState] = React.useState([])
    const [gotEveryone, setGotEveryone] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            if (!gotEveryone && !error) {
                requestData(
                    setLoading,
                    setState,
                    setError,
                    setPage,
                    setGotEveryone,
                    page,
                    'planets'
                )
            }
        }, 100)
    }, [page]) // eslint-disable-line
    React.useEffect(() => {
        return () => {
            setState([])
        }
    }, [])
    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
        },
        {
            title: 'Климат',
            dataIndex: 'climate',
            filters: [
                { text: 'temperate', value: 'temperate' },
                { text: 'arid', value: 'arid' },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.climate.indexOf(value) === 0,
        },
        {
            title: 'Гравитация',
            dataIndex: 'gravity',
        },
        {
            title: 'Численность населения',
            dataIndex: 'population',
        },
        {
            title: 'Создано',
            dataIndex: 'created',
        },
        {
            title: 'Отредактировано',
            dataIndex: 'edited',
        },
    ]

    const data = state.map((item, i) => {
        return {
            key: i,
            name: item.name,
            climate: item.climate,
            gravity: item.gravity,
            population: item.population,
            created: moment(item.created).format('LLL'),
            edited: moment(item.edited).format('LLL'),
        }
    })
    return error ? (
        <h1>Ошибка в запросе</h1>
    ) : (
        <TableSwapi
            data={data}
            columns={columns}
            loading={loading}
            pagination={true}
        />
    )
}

export default Planets
