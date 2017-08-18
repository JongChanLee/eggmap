class CreateEggProviders < ActiveRecord::Migration[5.1]
  def change
    create_table :egg_providers do |t|
      t.string :local_code, null: false
      t.string :provider,   null: false

      t.timestamps
    end
  end
end
