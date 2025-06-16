let display = document.getElementById('display');
        let currentInput = '0';
        let operator = null;
        let previousInput = null;
        let shouldResetDisplay = false;

        function updateDisplay() 
        {
            display.textContent = currentInput;
        }

        function inputNumber(num) 
        {
            if (shouldResetDisplay) 
                {
                currentInput = '0';
                shouldResetDisplay = false;
            }
            
            if (currentInput === '0') 
                {
                currentInput = num;
            } 
            else 
            {
                currentInput += num;
            }
            
            updateDisplay();
        }

        function inputOperator(op) 
        {
            if (operator !== null && !shouldResetDisplay) {
                calculate();
            }
            
            previousInput = currentInput;
            operator = op;
            shouldResetDisplay = true;
        }

        function inputDecimal() 
        {
            if (shouldResetDisplay) 
                {
                currentInput = '0';
                shouldResetDisplay = false;
            }
            
            if (currentInput.indexOf('.') === -1) 
                {
                currentInput += '.';
                updateDisplay();
            }
        }

        function calculate() 
        {
            if (operator === null || shouldResetDisplay) {
                return;
            }
            
            let prev = parseFloat(previousInput);
            let current = parseFloat(currentInput);
            let result;
            
            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        showError();
                        return;
                    }
                    result = prev / current;
                    break;
                default:
                    return;
            }
            
            currentInput = result.toString();
            operator = null;
            previousInput = null;
            shouldResetDisplay = true;
            updateDisplay();
        }

        function clearDisplay() 
        {
            currentInput = '0';
            operator = null;
            previousInput = null;
            shouldResetDisplay = false;
            display.classList.remove('error');
            updateDisplay();
        }

        function showError() 
        {
            display.classList.add('error');
            display.textContent = 'ERROR';
            setTimeout(() => {
                display.classList.remove('error');
                clearDisplay();
            }, 2000);
        }

        // Keyboard support
        document.addEventListener('keydown', function(event) 
        {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                inputNumber(key);
            } else if (key === '.') {
                inputDecimal();
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                inputOperator(key);
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            }
            else if (key === 'Backspace') {
                currentInput = currentInput.slice(0, -1) || '0';
                updateDisplay();
            }
        });

        // Add button press sound effect (visual feedback)
        document.querySelectorAll('button').forEach(button => 
            {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });