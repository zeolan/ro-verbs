import React, { act } from 'react';
import { renderWithProviders } from "./test-utils.tsx";
import { describe, expect, it } from "vitest";

import ThemeButton from "../components/ThemeButton.tsx";
import data from "../data.json";
import { Mode } from '../types.ts';

describe("Test ThemeButton", () => {
    const initialStateDark = {
        preloadedState:  {
            main: {
                mode: Mode.dark,
            }
        }
    };
    const initialStateLight = {
        preloadedState:  {
            main: {
                mode: Mode.light,
            }
        }
    };

    it("theme button should have LightModeIcon and \
        change icon to DarkModeIcon after click", async () => {
        const { getByTestId, getAllByRole } = renderWithProviders(<ThemeButton />, initialStateDark);
        const buttonElement = getByTestId("theme-button");
        expect(buttonElement).toBeVisible();
        const lightModeElement = getByTestId("LightModeIcon");
        expect(lightModeElement).toBeVisible();
        await act( async () => {buttonElement.click()});
        const darkModeElement = getByTestId("DarkModeIcon");
        expect(darkModeElement).toBeVisible();
    });
    it("theme button should have DarkModeIcon and \
        change icon to LightModeIcon after click", async () => {
        const { getByTestId, getAllByRole } = renderWithProviders(<ThemeButton />, initialStateLight);
        const buttonElement = getByTestId("theme-button");
        expect(buttonElement).toBeVisible();
        const darkModeElement = getByTestId("DarkModeIcon");
        expect(darkModeElement).toBeVisible();
        await act( async () => {buttonElement.click()});
        const lightModeElement = getByTestId("LightModeIcon");
        expect(lightModeElement).toBeVisible();
    });
});
