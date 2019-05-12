import React from 'react'
import { PersonalInfo } from '../Account'
import Table, { TableRow, TableCell } from '../Table'
import { PageRow, PageCol } from '../Page'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import dayjs from 'dayjs'

/* 
Нормативы

- https://studfiles.net/preview/5949665/
- https://studfiles.net/preview/5005961/page:47/
- https://www.youtube.com/watch?v=Z_vl7lskIc8

Эффективность работы (ЭР):

Степень врабатываемости (ВР):
    Результат меньше 1,0 – показатель хорошей врабатываемости, 
    соответственно, чем выше 1,0 данный показатель, 
    тем больше испытуемому требуется подготовка к основной работе.

Психическая устойчивость (ПУ):
    Показатель результата меньше 1,0 говорит о хорошей психической устойчивости, 
    соответственно, чем выше данный показатель, 
    тем хуже психическая устойчивость испытуемого к выполнению заданий.
*/

function Results({ data, user }) {
    const stimulusCount = data.stats.length

    const stats = data.stats.map(item => {
        const values = item.values
        const summaryTime = values.reduce((acc, item) => acc + item.time, 0)
        const averageTime = summaryTime / values.length
        const minReactionTime = values.reduce((acc, item) => {
            return item.time < acc ? item.time : acc
        }, values[0].time)
        const maxReactionTime = values.reduce((acc, item) => {
            return item.time > acc ? item.time : acc
        }, values[0].time)
        const variationalScale = maxReactionTime - minReactionTime
        const errorsCount = values.reduce(
            (acc, item) => (item.error ? ++acc : acc),
            0
        )

        return {
            ...item,
            errorsCount,
            summaryTime,
            averageTime,
            variationalScale,
            minReactionTime,
            maxReactionTime,
        }
    })

    const firstTest = stats[0]
    const lastTest = stats[data.stats.length - 1]

    const we = (firstTest.summaryTime + lastTest.summaryTime) / stimulusCount // Эффективность работы
    const wu = firstTest.summaryTime / we // Степень врабатываемости
    const ps = lastTest.summaryTime / we // Психическая устойчивость

    const chartData = stats.map(item => {
        return {
            name: item.id,
            uv: item.summaryTime,
        }
    })

    const renderLineChart = (
        <LineChart
            width={600}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )

    function tableBody() {
        return (
            <Table
                data={{
                    head: [
                        { id: 1, value: '№ таблицы' },
                        { id: 2, value: 'Время, мс' },
                        { id: 3, value: 'Ошибки' },
                        {
                            id: 4,
                            value: 'Среднее время поиска одного числа, мс',
                        },
                        { id: 5, value: 'Вариационный размах, мс' },
                    ],
                }}
            >
                {stats.map(item => {
                    return (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.summaryTime}</TableCell>
                            <TableCell>{item.errorsCount}</TableCell>
                            <TableCell>{item.averageTime}</TableCell>
                            <TableCell>{item.variationalScale}</TableCell>
                        </TableRow>
                    )
                })}
            </Table>
        )
    }

    return (
        <div>
            <PageRow>
                <PageCol>
                    <p>
                        Дата обследования:{' '}
                        <b>{dayjs(data.created).format('DD.MM.YYYY')}</b>
                    </p>
                    {user && <PersonalInfo user={user} />}
                </PageCol>

                <PageCol>{renderLineChart}</PageCol>
            </PageRow>

            <PageRow>
                <PageCol>{tableBody()}</PageCol>
            </PageRow>

            <PageRow>
                <PageCol>
                    <p>
                        Эффективность работы (ЭР): <b>{we.toFixed(2)}</b>
                    </p>
                    <p>
                        Степень врабатываемости (ВР): <b>{wu.toFixed(2)}</b>
                    </p>
                    <p>
                        Психическая устойчивость (ПУ): <b>{ps.toFixed(2)}</b>
                    </p>

                    <p>
                        {' '}
                        Концентрация внимания: <b>{}</b>
                    </p>
                    <p>
                        {' '}
                        Распределение внимания: <b>{}</b>
                    </p>
                </PageCol>
            </PageRow>
        </div>
    )
}

export default Results
