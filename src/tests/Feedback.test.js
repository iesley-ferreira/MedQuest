import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testes do arquivo Feedback.js', () => {

  it('Checks if the page displays the correct elements', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const usernameInput = screen.getByTestId('input-player-name')
    act(() => {
        history.push('/feedback');
        })
    const profilePicture = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const playerScore = screen.getByTestId('header-score');
    const playAgainButton = screen.getByTestId('btn-play-again');
    const rankingButton = screen.getByTestId('btn-ranking');
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
    expect(playAgainButton).toBeInTheDocument();
    expect(rankingButton).toBeInTheDocument();
  });

  it('Checks if, by clicking on the PlayAgain button, the user is redirected to the login page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback');
    })
    const playAgainButton = screen.getByTestId('btn-play-again');

    act(() => {
      userEvent.click(playAgainButton)
    })

    expect(history.location.pathname).toBe('/');

  });

  it('Checks if, by clicking on the Ranking button, the user is redirected to the Ranking page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback');
    })
    const rankingButton = screen.getByTestId('btn-ranking');

    act(() => {
      userEvent.click(rankingButton)
    })

    expect(history.location.pathname).toBe('/ranking');

  });
  it('Check if paragraph it has been displayed', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback');
    })
    const textFeedback = screen.getByTestId('feedback-text');
    expect(textFeedback).toBeInTheDocument();
  });
  it('Check if the text is correct', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback');
    })
    const textFeedback = screen.getByTestId('feedback-text');
    expect(textFeedback.innerHTML).toBe("Could be better...");
  });
  it('Check if the text is correct', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback');
    })
    const textFeedback = screen.getByTestId('feedback-text');
    const assertions = 5;
    const minimumAssertions = 1;

    const message = assertions < minimumAssertions ? 'Well Done!' : 'Could be better...';

    expect(textFeedback.innerHTML).toBe(message);
    expect(textFeedback.innerHTML).not.toBe('Well Done!');
  });

});
