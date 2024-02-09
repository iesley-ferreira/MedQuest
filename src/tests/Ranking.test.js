import App from '../App';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Tests for Ranking.js file', () => {
  it('Check rank page when it has none ranked players registered ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/ranking');
    });
    expect(screen.queryByTestId('player-name-0')).not.toBeInTheDocument();
    expect(screen.queryByTestId('player-score-0')).not.toBeInTheDocument();
  });

  it('Check goHome button', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/ranking');
    });
    const goHomeBtn = screen.getByTestId('btn-go-home');
    userEvent.click(goHomeBtn);
    expect(history.location.pathname).toBe('/');
  });
  
  it('Check if the ranking page has the correct elements', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/ranking');
    });
    const rankingTitle = screen.getByTestId('ranking-title');
    const goHomeBtn = screen.getByTestId('btn-go-home');
    expect(rankingTitle).toBeInTheDocument();
    expect(goHomeBtn).toBeInTheDocument();
  });

  // it('Check if players ranked are being displayed correctly', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);
  //   act(() => {
  //     history.push('/ranking');
  //   });

  //   const players = [
  //     { name: 'Gabriel', score: 100, email:'gabriel@trybe.com'},
  //     { name: 'Marcos', score: 200, email:'marcos@trybe.com'},
  //     { name: 'Yago', score: 300, email:'yago@trybe.com'}
  //   ];
  //   localStorage.setItem('players Ranking', JSON.stringify(players));

  //   players.forEach((player, index) => {
  //   const playerName = screen.getByTestId(`player-name-${index}`);
  //   const playerScore = screen.getByTestId(`player-score-${index}`);
  //   const playerEmail = screen.getByAltText('Player Avatar').getAttribute('src')
  //   expect(playerName).toHaveTextContent(player.name);
  //   expect(playerScore).toHaveTextContent(player.score.toString());
  //   expect(playerEmail).toHaveTextContent(player.email);
  // });
  // });
});