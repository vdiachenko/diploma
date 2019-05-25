import React from 'react'
import { NavLink } from 'react-router-dom'
import Page from '../Page'

function Tests() {
    return (
        <Page title="Методики">
            <h2>Выберите методику</h2>

            <ul>
                <li>
                    <NavLink to="/tests/schulte/manual">
                        "Таблицы Шульте" ("Шульте")
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tests/svmr/manual">
                        "Простая зрительно-моторная реакция" ("ПЗМР")
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        "Сложная зрительно-моторная реакция" ("СЗМР"){' '}
                        <span role="img" aria-label="В разработке">
                            🚧
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/">
                        "Реакция на движущийся объект" ("РДО"){' '}
                        <span role="img" aria-label="В разработке">
                            🚧
                        </span>
                    </NavLink>
                </li>
            </ul>
        </Page>
    )
}

export default Tests
