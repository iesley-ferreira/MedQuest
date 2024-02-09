import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Tests for the Game.js file', () => {
    const mockData = {
        "response_code": 0,
        "results": [
            {
                "category": "Entertainment: Video Games",
                "type": "multiple",
                "difficulty": "easy",
                "question": "What Nationality is D.Va from Overwatch?",
                "correct_answer": "Korean",
                "incorrect_answers": [
                    "Japanese",
                    "Chinese",
                    "Vietnamese "
                ]
            },
            {
                "category": "Entertainment: Video Games",
                "type": "multiple",
                "difficulty": "medium",
                "question": "In the Half-Life franchise, what is the real name of the &quot;gravity gun&quot;?",
                "correct_answer": "Zero-Point Energy Field Manipulator",
                "incorrect_answers": [
                    "Universal Gravity Manipulation Device",
                    "Isaac Newton&#039;s Theory Disprover",
                    "Quantum Energy Displacement Modifier"
                ]
            },
            {
                "category": "Entertainment: Comics",
                "type": "multiple",
                "difficulty": "easy",
                "question": "In &quot;Homestuck&quot; what is Dave Strider&#039;s guardian?",
                "correct_answer": "Bro",
                "incorrect_answers": [
                    "Becquerel",
                    "Doc Scratch",
                    "Halley"
                ]
            },
            {
                "category": "Entertainment: Musicals & Theatres",
                "type": "boolean",
                "difficulty": "hard",
                "question": "The protagonist&#039;s names in &#039;Who&#039;s Afraid of Virginia Woolf&#039;, George and Martha, were derived from George Washington and his wife.",
                "correct_answer": "True",
                "incorrect_answers": [
                    "False"
                ]
            },
            {
                "category": "Entertainment: Video Games",
                "type": "multiple",
                "difficulty": "easy",
                "question": "Which of the following was a map that was in Team Fortress 2 at launch?",
                "correct_answer": "Gravel Pit",
                "incorrect_answers": [
                    "Hoodoo",
                    "Gold Rush",
                    "Upward"
                ]
            }
        ]
    };
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        });
    });

    jest.setTimeout(32000);
    
    it('Check if the header elements are present on the page', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        act(() => {
            history.push('/game');
        });
        
        const displayName = screen.getByTestId('header-player-name');
        const displayScore = screen.getByTestId('header-score');
        const displayGravatar = screen.getByTestId('header-profile-picture');
        
        expect(displayName).toBeInTheDocument();
        expect(displayScore).toBeInTheDocument();
        expect(displayGravatar).toBeInTheDocument();
    });

    it('Check if the game page has the correct elements', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/game');
        });
        
        const displayQuestionCategory = await screen.findByTestId('question-category');
        const displayQuestionText = screen.getByTestId('question-text');
        const displayAnswerOptions = screen.getByTestId('answer-options');
        const displayTimer = screen.getByTestId('timer');
        expect(global.fetch).toHaveBeenCalled();

        await waitFor(() => {
        expect(displayAnswerOptions).toBeInTheDocument();
        expect(displayTimer).toBeInTheDocument();
        expect(displayQuestionCategory).toBeInTheDocument();
        expect(displayQuestionText).toBeInTheDocument();
        }, { timeout: 3000 });

        act(() => {
            userEvent.click(displayAnswerOptions.children[0]);
        });

        const displayNextButton = screen.getByTestId('btn-next');
        expect(displayNextButton).toBeInTheDocument();

        act(() => {
            userEvent.click(displayNextButton);
        });

        const displayNextQuestion = await screen.findByText('In the Half-Life franchise, what is the real name of the &quot;gravity gun&quot;?');
        expect(displayNextQuestion).toBeInTheDocument();
    });

    it('Check if the timer stoped', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/game');
        });

        const displayAnswerOptions = await screen.findByTestId('answer-options');
        const displayTimerBefore = screen.getByTestId('timer');
        act(() => {
            userEvent.click(displayAnswerOptions.children[0]);
        });
        const displayTimerAfter = screen.getByTestId('timer');
        expect(displayTimerBefore).toBe(displayTimerAfter);
    });

    it('Check if the last question redirect the user to /feedback', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/game');
        });

        const lastQuestion = mockData.results.length - 1;
        const displayAnswerOption = await screen.findByTestId('answer-options');

        for (let index = 0; index < lastQuestion; index += 1) {
            act(() => {
                userEvent.click(displayAnswerOption.children[0]);
            });

            const displayNextButton = screen.getByTestId('btn-next');
            act(() => {
                userEvent.click(displayNextButton);
            });
        }

        act(() => {
            userEvent.click(displayAnswerOption.children[0]);
        });

        const displayNextButton = screen.getByTestId('btn-next');
        act(() => {
            userEvent.click(displayNextButton);
        });

        await waitFor(() => {
            expect(history.location.pathname).toBe('/feedback');
        });

        const displayFeedback = await screen.findByText('Feedback');
        expect(displayFeedback).toBeInTheDocument();
    });

    it('Check if the Token is expired and if then redirect to login', async () => {
        const magicNum = 3;
        mockData.response_code = magicNum;

        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/game');
        });

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
        });
      });

    it('Check if the timer is working', async () => {
        const magicNum = 0;
        mockData.response_code = magicNum;

        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/game');
        });

        const displayAnswerOption = await screen.findByTestId('answer-options');
        const correctAnswer = await screen.findByTestId('correct-answer');
        const displayTimer = screen.getByTestId('timer');
        expect(displayTimer).toBeInTheDocument();
        expect(displayAnswerOption).toBeEnabled();
        expect(displayTimer.innerHTML).toBe('30');

        await waitFor(() => {
            expect(displayTimer).toBeInTheDocument();
            expect(correctAnswer).toBeDisabled();
            expect(displayTimer.innerHTML).toBe('0');
        } , { timeout: 32000 });
    });
});