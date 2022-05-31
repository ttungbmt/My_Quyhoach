<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HcTinhResource\Pages;
use App\Filament\Resources\HcTinhResource\RelationManagers;
use App\Models\HcTinh;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use FilamentPro\Filters\TextFilter;
use FilamentPro\Resources\Resource;

class HcTinhResource extends Resource
{
    protected static ?string $model = HcTinh::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    protected static ?string $recordTitleAttribute = 'ten';

    protected static ?int $navigationSort = 0;

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
        return __('app.hc_tinh');
    }

    protected static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('ma')->label(__('app.matinh'))->unique()->required(),
                TextInput::make('ten')->label(__('app.tentinh'))->required(),
                Select::make('cap')->label(__('app.cap_hc'))->options(HcTinh::getDirCap()),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('ma')->label(__('app.matinh'))->searchable()->sortable(),
                TextColumn::make('ten')->label(__('app.tentinh'))->searchable()->sortable(),
                TextColumn::make('cap')->label(__('app.cap_hc'))->searchable()->sortable(),
                TextColumn::make('quans_count')->counts('quans')->label(__('app.quans_count'))->sortable()->visibleFrom('md'),
                TextColumn::make('phuongs_count')->counts('phuongs')->label(__('app.phuongs_count'))->sortable()->visibleFrom('md'),
            ])
            ->filters([
                TextFilter::make('ma')->label(__('app.matinh')),
                TextFilter::make('ten')->label(__('app.tentinh')),
                SelectFilter::make('cap')->label(__('app.cap_hc'))
                    ->options(HcTinh::getDirCap())
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageHcTinhs::route('/'),
        ];
    }
}
