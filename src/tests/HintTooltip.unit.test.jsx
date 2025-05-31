import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HintTooltip from '../components/HintTooltip.tsx';
import { renderWithProviders } from './test-utils.tsx';

describe('Test HintTooltip', () => {
  it('should render HintTooltip with children', () => {
    renderWithProviders(
      <HintTooltip open={true}>
        <div>HintTooltip children</div>
      </HintTooltip>,
    );
    const hintTooltipElement = screen.getByRole('tooltip');
    expect(hintTooltipElement).toBeVisible();
    const hintTooltipChildren = screen.getByText('HintTooltip children');
    expect(hintTooltipChildren).toBeVisible();
  });
  it('should not render HintTooltip', () => {
    renderWithProviders(
      <HintTooltip open={false}>
        <div>HintTooltip children</div>
      </HintTooltip>,
    );
    const hintTooltipElement = screen.queryByRole('tooltip');
    expect(hintTooltipElement).toBeNull();
  });
});
