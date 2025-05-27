import React from 'react';
import { renderWithProviders } from "./test-utils.tsx";
import { describe, expect, it } from "vitest";

import SettingsButton from "../components/SettingsButton.tsx";
import data from "../data.json";
import { Lang, Mode } from '../types.ts';

describe("Test SettingsButton", () => {
    const initialState = {
        preloadedState:  {
            main: {
                fromLang: Lang.ro,
                sortVerbs: false,
                verbs: data,
                mode: Mode.light,
                numberOfVerbs: data.length,
            }
        }
    };

    it("test settings opens and have 4 items", async () => {
        const { getByTestId, getAllByRole } = renderWithProviders(<SettingsButton />, initialState);
        const settingsButtonElement = getByTestId("settings-button");
        expect(settingsButtonElement).toBeVisible();
        await settingsButtonElement.click()
        //await userEvent.click(settingsButtonElement);
        const settingsModalElement = getByTestId("settings-popper");
        expect(settingsModalElement).toBeVisible();
        const menuItems = getAllByRole("menuitem");
        expect(menuItems.length).toBe(4);
        const activeMenuItems = menuItems.filter(item => item.getAttribute("data-active") === "true");
        expect(activeMenuItems.length).toEqual(2);
        expect(activeMenuItems[0].textContent).toEqual("В случайном порядке");
        expect(activeMenuItems[1].textContent).toEqual("Ro -> Ru");
        const notActiveMenuItems = menuItems.filter(item => item.getAttribute("data-active") === "false");
        expect(notActiveMenuItems.length).toEqual(2);
        await notActiveMenuItems[0].click();
        //await settingsButtonElement.click()
        //await notActiveMenuItems[1].click();
        const activeMenuItemsAfterClick = menuItems.filter(item => item.getAttribute("data-active") === "true");
        expect(activeMenuItemsAfterClick.length).toEqual(2);
        //expect(activeMenuItemsAfterClick[0].textContent).toEqual("Сортировка  A-Z");
        //expect(activeMenuItemsAfterClick[1].textContent).toEqual("Ru -> Ro");
    });
    it("test settings opens and have 4 items", async () => {
        const { getByTestId, getAllByRole } = renderWithProviders(<SettingsButton />);
        const settingsButtonElement = getByTestId("settings-button");
        expect(settingsButtonElement).toBeVisible();
        await settingsButtonElement.click()
        //await userEvent.click(settingsButtonElement);
        const settingsModalElement = getByTestId("settings-popper");
        expect(settingsModalElement).toBeVisible();
        const menuItems = getAllByRole("menuitem");
        expect(menuItems.length).toBe(4);
        const activeMenuItems = menuItems.filter(item => item.getAttribute("data-active") === "true");
        expect(activeMenuItems.length).toEqual(2);
        expect(activeMenuItems[0].textContent).toEqual("В случайном порядке");
        expect(activeMenuItems[1].textContent).toEqual("Ro -> Ru");
        const notActiveMenuItems = menuItems.filter(item => item.getAttribute("data-active") === "false");
        expect(notActiveMenuItems.length).toEqual(2);
        await notActiveMenuItems[0].click();
        //await settingsButtonElement.click()
        //await notActiveMenuItems[1].click();
        const activeMenuItemsAfterClick = menuItems.filter(item => item.getAttribute("data-active") === "true");
        expect(activeMenuItemsAfterClick.length).toEqual(2);
        //expect(activeMenuItemsAfterClick[0].textContent).toEqual("Сортировка  A-Z");
        //expect(activeMenuItemsAfterClick[1].textContent).toEqual("Ru -> Ro");
    });
});
