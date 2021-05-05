import React from 'react'
import moment from 'moment'
// import { Link } from 'react-router-dom'
import { requestData } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function Planets() {
    const [state, setState] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            requestData(setState, 'planets/')
        }, 1000)
    }, [])
    console.log(state)
    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
        },
        {
            title: 'Климат',
            dataIndex: 'climate',
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
    return (
        <TableSwapi
            data={data}
            columns={columns}
            loading={loading}
            pagination={true}
        />
    )
}

export default Planets
