<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FAQResource\Pages;
use App\Filament\Resources\FAQResource\RelationManagers;
use App\Models\FAQ;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Str;
use Mohamedsabil83\FilamentFormsTinyeditor\Components\TinyEditor;

class FAQResource extends Resource
{
    protected static ?string $model = FAQ::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make()->schema([
                    Card::make()->schema([
                        TextInput::make('title')
                            ->label(__('Post Title'))
                            ->required()
                            ->maxLength(255),
                        TinyEditor::make('content')->label(__('Post Content'))->showMenuBar()->required(),
                    ]),
                ])->columnSpan(3),
                Grid::make()->schema([
                    Section::make(__('Visibility'))
                        ->description(__('Visibility Options'))
                        ->schema([
                            Hidden::make('user_id')->default(auth()->user()->id)->required(),
                            Select::make('status')
                                ->label(__('Status'))
                                ->default('publish')
                                ->required()
                                ->reactive(),
                        ])
                        ->collapsible(),

                ])->columnSpan(1),
            ])->columns(4);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title'),
            ])
            ->filters([
                //
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFAQS::route('/'),
            'create' => Pages\CreateFAQ::route('/create'),
            'edit' => Pages\EditFAQ::route('/{record}/edit'),
        ];
    }

    public static function getLabel(): string
    {
        return __('FAQ');
    }

    public static function getPluralLabel(): string
    {
        return __('FAQs');
    }

    protected static function getNavigationLabel(): string
    {
        return __('FAQs');
    }
}
