import React from 'react'
import dayjs from 'dayjs'
import Table, { TableRow, TableCell } from '../Table'
import { PageRow, PageCol } from '../Page'
import { PersonalInfo } from '../Account'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

/* 
Нормативы

- https://www.youtube.com/watch?v=Wx9QPPrSezY
- https://www.youtube.com/watch?v=lCxi3pHnb2o

Мужчины
    Среднее время реакции (ВР), мс: 196,43 - 268,37

Женщины
    Среднее время реакции (ВР), мс: 205,75 - 279,22
*/

function calcVogue(data) {
    const uniqTimes = {}

    data.forEach(item => {
        uniqTimes[item.time] = uniqTimes[item.time] || 0
        uniqTimes[item.time] += 1
    })

    let max = Object.keys(uniqTimes)[0]

    for (const key in uniqTimes) {
        if (!uniqTimes.hasOwnProperty(key)) {
            return
        }

        if (uniqTimes[key] > uniqTimes[max]) {
            max = key
        }
    }

    return {
        vogue: max,
        vogueQty: uniqTimes[max],
    }
}

function calcStandardDeviation(averageReactionTime, data) {
    const summary = data.reduce((acc, currentValue) => {
        return (
            acc +
            (Math.round(currentValue.time) - Math.round(averageReactionTime)) **
                2
        )
    }, 0)

    return Math.sqrt(summary / (data.length - 1))
}

function getStats(item) {
    const id = item._id
    const data = item.values
    const stimulusCount = data.length
    const summaryTime = data.reduce(
        (acc, currentValue) => acc + currentValue.time,
        0
    )
    const averageReactionTime = summaryTime / stimulusCount
    const minReactionTime = data.reduce((acc, currentValue) => {
        return currentValue.time < acc ? currentValue.time : acc
    }, data[0].time)
    const maxReactionTime = data.reduce((acc, currentValue) => {
        return currentValue.time > acc ? currentValue.time : acc
    }, data[0].time)
    const { vogue, vogueQty } = calcVogue(data)
    const vogueAmplitude = (vogueQty * 100) / stimulusCount
    const standardDeviation = calcStandardDeviation(averageReactionTime, data)
    const variationalScale = maxReactionTime - minReactionTime
    const variationCoeff = (standardDeviation / averageReactionTime) * 100
    const aheadCount = data.reduce(
        (acc, currentValue) => acc + currentValue.ahead,
        0
    )
    const skipCount = data.reduce(
        (acc, currentValue) => (currentValue.skip ? ++acc : acc),
        0
    )

    return {
        id,
        averageReactionTime,
        minReactionTime,
        maxReactionTime,
        vogue,
        vogueAmplitude,
        standardDeviation,
        variationalScale,
        variationCoeff,
        aheadCount,
        skipCount,
    }
}

function Results({ data, user }) {
    const stats = data.stats.map(getStats)
    const individualMeanReactionTime =
        stats.reduce((acc, item) => acc + item.averageReactionTime, 0) /
        stats.length

    let nonspecificPerformance

    if (user.gender === 'male') {
        if (individualMeanReactionTime < 196.43) {
            nonspecificPerformance = 'высокий'
        } else if (individualMeanReactionTime > 268.37) {
            nonspecificPerformance = 'низкий'
        } else {
            nonspecificPerformance = 'средний'
        }
    } else {
        if (individualMeanReactionTime < 205.75) {
            nonspecificPerformance = 'высокий'
        } else if (individualMeanReactionTime > 279.22) {
            nonspecificPerformance = 'низкий'
        } else {
            nonspecificPerformance = 'средний'
        }
    }

    const chartData = stats.map((item, i) => {
        return {
            name: ++i,
            uv: item.averageReactionTime,
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
            <Table>
                <TableRow>
                    <TableCell>Среднее время реакции (ВР), мс</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>
                            {item.averageReactionTime}
                        </TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Минимальное время реакции, мс</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>
                            {item.minReactionTime}
                        </TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Максимальное время реакции, мс</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>
                            {item.maxReactionTime}
                        </TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Мода, мс</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>{item.vogue}</TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Амплитуда моды, %</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>
                            {item.vogueAmplitude}
                        </TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Cреднее квадратичное отклонение, мс</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>
                            {item.standardDeviation.toFixed(2)}
                        </TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Вариационный размах, мс</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>
                            {item.variationalScale}
                        </TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Коэффициент вариации, %</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>
                            {item.variationCoeff.toFixed(2)}
                        </TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Опережение</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>{item.aheadCount}</TableCell>
                    ))}
                </TableRow>

                <TableRow>
                    <TableCell>Пропуск</TableCell>
                    {stats.map(item => (
                        <TableCell key={item.id}>{item.skipCount}</TableCell>
                    ))}
                </TableRow>
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
                        Индивидуальное среднее время реакции (ИСВР), мс:{' '}
                        <b>{individualMeanReactionTime}</b>
                    </p>
                    <p>
                        Уровень функционирования центральной нервной системы:{' '}
                        <b>{nonspecificPerformance}</b>
                    </p>
                </PageCol>
            </PageRow>
        </div>
    )
}

export default Results
