<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LoaidatResource\Pages;
use App\Filament\Resources\LoaidatResource\RelationManagers;
use App\Models\Loaidat;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Table;
use Filament\Tables\Columns\TextColumn;
use FilamentPro\Resources\Resource;

class LoaidatResource extends Resource
{
    protected static ?string $model = Loaidat::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    protected static ?string $recordTitleAttribute = 'ten';

    protected static ?int $navigationSort = 10;

    protected static function getNavigationGroup(): ?string
    {
        return __('Directory');
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['ma', 'ten'];
    }

    public static function getLabel(): string
    {
        return __('app.loaidat');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('ma')->label(__('app.ma'))->required(),
                TextInput::make('ten')->label(__('app.ten'))->required(),
                ColorPicker::make('fill_color')->label(__('app.fill_color'))->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('#')->sortable(),
                TextColumn::make('ma')->label(__('app.ma'))->searchable()->sortable(),
                TextColumn::make('ten')->label(__('app.ten'))->searchable()->sortable(),
                TextColumn::make('fill_color')->label(__('app.fill_color'))->sortable(),
            ])
            ->filters([
                //
            ])->defaultSort('id');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageLoaidats::route('/'),
        ];
    }
}
