import { render, screen, fireEvent } from '@testing-library/react';
import ModalMolecule from '.';

describe('ModalMolecule', () => {
  const onCloseMock = jest.fn();
  const goBackMock = jest.fn();

  const defaultProps = {
    open: true,
    onClose: onCloseMock,
    title: "Test Modal",
    content: "Test content",
    handleNavigateBack: goBackMock,
  };

  it('renders with the provided title and content', () => {
    render(<ModalMolecule {...defaultProps} />);
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument;
    expect(screen.getByText('Test content')).toBeInTheDocument;
  });

  it('calls onClose when close icon is clicked', () => {
    render(<ModalMolecule {...defaultProps} />);
    
    const closeIcon = screen.getByAltText('close');
    fireEvent.click(closeIcon);
    
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls goBack when the back icon is clicked', () => {
    render(<ModalMolecule {...defaultProps} />);
    
    const backIcon = screen.getByAltText('back');
    fireEvent.click(backIcon);
    
    expect(goBackMock).toHaveBeenCalled();
  });

  it('does not display the title and back icon when title is not provided', () => {
    const propsWithoutTitle = { ...defaultProps, title: undefined,isConfirmModal:true };
    render(<ModalMolecule {...propsWithoutTitle} />);

    expect(screen.queryByText('Test Modal')).toBeNull();
    expect(screen.queryByAltText('back')).toBeNull();
  });
  it('does not display the title and back icon when title is not provided', () => {
    const propsWithoutTitle = { ...defaultProps,isConfirmModal:true };
    render(<ModalMolecule {...propsWithoutTitle} />);

    expect(screen.queryByText('Test Modal')).toBeNull();
    expect(screen.queryByAltText('back')).toBeNull();
  });

});
