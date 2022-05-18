<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HcQuanResource\Pages;
use App\Filament\Resources\HcQuanResource\RelationManagers;
use App\Models\HcQuan;
use App\Models\HcTinh;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Table;
use Filament\Tables\Columns\TextColumn;
use FilamentPro\Resources\Resource;

class HcQuanResource extends Resource
{
    protected static ?string $model = HcQuan::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    protected static ?string $recordTitleAttribute = 'ten';

    protected static ?int $navigationSort = 1;

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
        return __('app.hc_quan');
    }

    protected static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('ma_tp')->label(__('app.hc_tinh'))->options(fn() => HcTinh::getDirMatinh())->searchable()->required(),
                TextInput::make('ma')->unique()->label(__('app.maquan')),
                TextInput::make('ten')->label(__('app.tenquan')),
                Select::make('cap')->label(__('app.cap_hc'))->options(HcQuan::getDirCap()),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('tinh.ma')->label(__('app.matinh'))->searchable()->sortable(),
                TextColumn::make('tinh.ten')->label(__('app.tentinh'))->searchable()->sortable(),
                TextColumn::make('ma')->label(__('app.maquan'))->searchable()->sortable(),
                TextColumn::make('ten')->label(__('app.tenquan'))->searchable()->sortable(),
                TextColumn::make('cap')->label(__('app.tenquan'))->searchable()->sortable(),
                TextColumn::make('phuongs_count')->counts('phuongs')->label(__('app.phuongs_count'))->sortable(),
            ])
            ->filters([
                //
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageHcQuans::route('/'),
        ];
    }
}
