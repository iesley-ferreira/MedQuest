import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Tests for the Login.js file', () => {
    it('Check if the correct elements are present on the page', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        act(() => {
            history.push('/');
        });

        const inputName = screen.getByTestId('input-player-name');
        const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
        const playBtn = screen.getByTestId('btn-play');
        const settingsBtn = screen.getByTestId('btn-settings');
        expect(inputName).toBeInTheDocument();
        expect(inputGravatarEmail).toBeInTheDocument();
        expect(playBtn).toBeInTheDocument();
        expect(settingsBtn).toBeInTheDocument();
    });
    it('Check if the play button is disabled when the email input is invalid', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        act(() => {
            history.push('/');
        });
            
        const inputName = screen.getByTestId('input-player-name');
        const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
        const playBtn = screen.getByTestId('btn-play');
        expect(playBtn).toBeDisabled();

        act(() => {
        userEvent.type(inputName, 'inc');
        userEvent.type(inputGravatarEmail, 'teste');
        });
        expect(playBtn).toBeDisabled();
    });
    it('Check if the play button is enabled when the email input is valid', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        act(() => {
            history.push('/');
        });

        const inputName = screen.getByTestId('input-player-name');
        const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
        const playBtn = screen.getByTestId('btn-play');
        expect(playBtn).toBeDisabled();

        act(() => {
        userEvent.type(inputName, 'correctName');
        userEvent.type(inputGravatarEmail, 'correctEmail@gmail.com');
        });
        expect(playBtn).toBeEnabled();
    });
    it('Check if the settings button redirects to the settings page', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        act(() => {
        history.push('/');
        });

        const settingsBtn = screen.getByTestId('btn-settings');

        act(() => {
        userEvent.click(settingsBtn);
        });
        expect(history.location.pathname).toBe('/settings');
    });
    it('Check if the play button redirects to the game page', async () => {
        const { history } = renderWithRouterAndRedux(<App />);

        act(() => {
        history.push('/');
        });

        const inputName = screen.getByTestId('input-player-name');
        const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
        const playBtn = screen.getByTestId('btn-play');

        act(() => {
        userEvent.type(inputName, 'correctName');
        userEvent.type(inputGravatarEmail, 'correctEmail@gmail.com');
        userEvent.click(playBtn);
        });

        await waitFor(() => {
        expect(history.location.pathname).toBe('/game');
        });
    });
});