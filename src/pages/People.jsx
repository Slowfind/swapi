import React from 'react'
import moment from 'moment'
// import { Link } from 'react-router-dom'
import { requestData } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function People() {
    const [state, setState] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            requestData(setState, 'people/')
        }, 1000)
    }, [])
    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birth_year',
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
        },
        {
            title: 'Рост',
            dataIndex: 'height',
        },
        {
            title: 'Вес',
            dataIndex: 'mass',
        },
        {
            title: 'Цвет волос',
            dataIndex: 'hair_color',
        },
        {
            title: 'Цвет кожи',
            dataIndex: 'skin_color',
        },
        {
            title: 'Цвет глаз',
            dataIndex: 'eye_color',
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
            birth_year: item.birth_year,
            gender: item.gender,
            height: item.height,
            mass: item.mass,
            hair_color: item.hair_color,
            skin_color: item.skin_color,
            eye_color: item.eye_color,
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

export default People
