/* immport libraries */
import React from 'react'
import { Link } from 'react-router-dom'

/* import components */
import { requestDataSmall } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

function Home() {
    const link = true // проверка на наличие кнопки назад
    const [state, setState] = React.useState([]) // стейт комонента
    const [error, setError] = React.useState(null) // проверка на ошибки
    const [gotEveryone, setGotEveryone] = React.useState(false) // проверка на получение всех элементов
    const [loading, setLoading] = React.useState(false) // проверка на загрузку данных
    React.useEffect(() => {
        setLoading(true)
        if (!gotEveryone && !error) {
            setTimeout(() => {
                requestDataSmall('', setState, setError, setGotEveryone)
                setLoading(false)
            }, 1000)
        }
    }, [error, gotEveryone])

    /* Откатываем стейт компоненты, если перешли на другую страницу */
    React.useEffect(() => {
        return () => {
            setState([])
        }
    }, [])
    /* заполнение заголовков таблицы */
    const columns = [
        {
            title: 'Номер',
            dataIndex: 'key',
            width: '10%',
        },
        {
            title: 'Название',
            dataIndex: 'title',
            width: '20%',
        },
        {
            title: 'АПИ',
            dataIndex: 'address',
            width: '20%',
        },
        {
            render: (_, item) => (
                <Link to={`${item.title}/`}>Открыть страницу</Link> // отображение кнопки
            ),
        },
    ]
    const data = []

    for (let i = 0; i < Object.keys(state).length; i++) {
        data.push({
            key: i + 1,
            title: Object.keys(state)[i],
            address: Object.values(state)[i],
        })
    } // составление значений у таблицы

    return error ? (
        <h1>Ошибка в запросе</h1>
    ) : (
        <TableSwapi
            link={link}
            data={data}
            columns={columns}
            loading={loading}
            pagination={false}
        />
    ) /* Если есть какие-то ошибки в запросе к апи, тогда выходит h1, иначе выводится таблица */
}

export default Home
