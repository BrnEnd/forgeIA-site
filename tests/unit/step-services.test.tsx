import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { StepServices } from '@/app/briefing/(steps)/step-services';
import type { StepServicesInput } from '@/lib/validation';

function Wrapper() {
  const form = useForm<StepServicesInput>({
    defaultValues: { services: [], goals: '' }
  });

  return <StepServices form={form} />;
}

describe('StepServices', () => {
  it('renderiza opções de serviços', () => {
    render(<Wrapper />);
    expect(screen.getByLabelText('Sistemas Web')).toBeInTheDocument();
    expect(screen.getByLabelText('Aplicativos Mobile')).toBeInTheDocument();
  });

  it('permite selecionar serviços', () => {
    render(<Wrapper />);
    const webCheckbox = screen.getByLabelText('Sistemas Web');
    fireEvent.click(webCheckbox);
    expect((webCheckbox as HTMLInputElement).checked).toBe(true);
  });
});
