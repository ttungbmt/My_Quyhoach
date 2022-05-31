<?php
namespace FilamentPro\Filters;

use Filament\Forms\Components\TextInput;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\Concerns;

class TextFilter extends Filter
{
    use Concerns\HasPlaceholder;
    use Concerns\HasRelationship;

    public function getFormSchema(): array
    {
        return $this->formSchema ?? [
                TextInput::make('value')
                    ->type('search')
                    ->label($this->getLabel())
                    ->placeholder($this->getPlaceholder())
                    ->default($this->getDefaultState()),
            ];
    }
}
